import { createHash } from "node:crypto";
import { stat } from "node:fs/promises";
import { extname, parse } from "node:path";
import { parseArgs } from "node:util";
import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { loadEnvConfig } from "@next/env";
import sharp from "sharp";

const PREFIXES = ["posts", "projects"] as const;
type Prefix = (typeof PREFIXES)[number];

const DEFAULT_WIDTH = 1600;
const DEFAULT_QUALITY = 82;
const SUPPORTED_EXTENSIONS = new Set([
  ".avif",
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);

function printHelp() {
  console.log(`Upload an optimized WebP image to Cloudflare R2.

Usage:
  bun run upload:post <input> [options]
  bun run upload:project <input> [options]

Options:
  --name <slug>   Override the output filename
  --width <px>    Max width, default ${DEFAULT_WIDTH}
  --quality <n>   WebP quality, default ${DEFAULT_QUALITY}
  --no-hash       Use a stable filename instead of a content hash
  --force         Allow overwrite when --no-hash is used
  --dry-run       Optimize and print results without uploading
  -h, --help      Show this help

Environment:
  R2_ACCOUNT_ID
  R2_ACCESS_KEY_ID
  R2_SECRET_ACCESS_KEY
  R2_BUCKET
  R2_PUBLIC_BASE_URL
  R2_ENDPOINT       Optional endpoint override`);
}

function fail(message: string): never {
  throw new Error(message);
}

function isPrefix(value: string): value is Prefix {
  return (PREFIXES as readonly string[]).includes(value);
}

function parsePositiveInt(
  value: string | undefined,
  fallback: number,
  label: string,
): number {
  if (value === undefined) {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    fail(`--${label} must be a positive integer.`);
  }

  return parsed;
}

function slugify(value: string): string {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || "asset";
}

function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unit = 0;

  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }

  return `${size.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    fail(`Missing ${name}. Add it to .env.local or .env.`);
  }

  return value;
}

function getPublicUrl(baseUrl: string, key: string): string {
  return `${baseUrl.replace(/\/+$/, "")}/${key}`;
}

function isNotFoundError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const candidate = error as {
    name?: string;
    $metadata?: { httpStatusCode?: number };
  };

  return (
    candidate.name === "NotFound" ||
    candidate.$metadata?.httpStatusCode === 404
  );
}

function printSnippet(prefix: Prefix, url: string) {
  if (prefix === "projects") {
    console.log(`\nProject frontmatter:\nthumbnail: "${url}"`);
    return;
  }

  console.log(`\nPost Markdown:\n![describe the image](${url})`);
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      name: { type: "string" },
      width: { type: "string" },
      quality: { type: "string" },
      "no-hash": { type: "boolean" },
      force: { type: "boolean" },
      "dry-run": { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
  });

  if (values.help) {
    printHelp();
    return;
  }

  const [prefixValue, input] = positionals;
  if (!prefixValue || !input) {
    fail("Provide a prefix and an input file. Run with --help for usage.");
  }

  if (positionals.length > 2) {
    fail("Upload one input file per run.");
  }

  if (!isPrefix(prefixValue)) {
    fail(`Prefix must be one of: ${PREFIXES.join(", ")}.`);
  }

  const width = parsePositiveInt(values.width, DEFAULT_WIDTH, "width");
  const quality = parsePositiveInt(values.quality, DEFAULT_QUALITY, "quality");
  if (quality > 100) {
    fail("--quality must be between 1 and 100.");
  }

  const inputStat = await stat(input).catch(() => null);
  if (!inputStat?.isFile()) {
    fail(`Input file not found: ${input}`);
  }

  const extension = extname(input).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    fail(
      `Unsupported input format "${extension || "unknown"}". Use ${[
        ...SUPPORTED_EXTENSIONS,
      ].join(", ")}.`,
    );
  }

  loadEnvConfig(process.cwd(), false, {
    info: () => undefined,
    error: (message) => console.error(message),
  });

  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .toColourspace("srgb")
    .webp({ quality, effort: 4 })
    .toBuffer({ resolveWithObject: true });

  const hash = createHash("sha256").update(data).digest("hex").slice(0, 8);
  const slug = slugify(values.name?.trim() || parse(input).name);
  const useHash = !values["no-hash"];
  const key = useHash
    ? `${prefixValue}/${slug}-${hash}.webp`
    : `${prefixValue}/${slug}.webp`;
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL?.trim();
  const previewUrl = publicBaseUrl
    ? getPublicUrl(publicBaseUrl, key)
    : `<R2_PUBLIC_BASE_URL>/${key}`;

  console.log(`Source:  ${input} (${formatBytes(inputStat.size)})`);
  console.log(
    `Output:  ${key} (${formatBytes(data.byteLength)}, ${info.width}x${info.height})`,
  );
  console.log(
    `Size:    ${Math.round((data.byteLength / inputStat.size) * 100)}% of source`,
  );

  if (values["dry-run"]) {
    console.log(`URL:     ${previewUrl}`);
    printSnippet(prefixValue, previewUrl);
    return;
  }

  const bucket = requireEnv("R2_BUCKET");
  const accessKeyId = requireEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = requireEnv("R2_SECRET_ACCESS_KEY");
  const resolvedPublicBaseUrl = requireEnv("R2_PUBLIC_BASE_URL");
  const endpoint =
    process.env.R2_ENDPOINT?.trim() ||
    `https://${requireEnv("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`;

  const client = new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });

  try {
    if (!useHash && !values.force) {
      try {
        await client.send(
          new HeadObjectCommand({ Bucket: bucket, Key: key }),
        );
        fail(`Object already exists: ${key}. Re-run with --force to overwrite.`);
      } catch (error) {
        if (!isNotFoundError(error)) {
          throw error;
        }
      }
    }

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: data,
        ContentType: "image/webp",
        CacheControl: useHash
          ? "public, max-age=31536000, immutable"
          : "public, max-age=86400",
      }),
    );
  } finally {
    client.destroy();
  }

  const url = getPublicUrl(resolvedPublicBaseUrl, key);
  console.log(`URL:     ${url}`);
  printSnippet(prefixValue, url);

  const check = await fetch(url, { method: "HEAD" }).catch(() => null);
  if (!check?.ok) {
    console.warn(
      "Warning: the public URL did not return 200. Check the bucket's public access and custom domain.",
    );
  }
}

main().catch((error: unknown) => {
  console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
