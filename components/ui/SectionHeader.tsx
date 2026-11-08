interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: SectionHeaderProps) {
  const Heading = as;
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : ""}>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="rule-accent" aria-hidden="true" />
        <p className="font-mono text-xs uppercase tracking-wider text-muted">{eyebrow}</p>
      </div>
      <Heading
        className={`mt-4 font-bold text-primary ${
          as === "h1" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
        }`}
      >
        {title}
      </Heading>
      {description ? (
        <p className={`mt-3 max-w-2xl text-secondary ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
