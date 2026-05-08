export function TechBadge({ icon, label, delay }: { icon: string; label: string, delay: string }) {
  // Utilizing the custom .badge class from globals.css
  return (
    <div className="badge animate-float cursor-pointer" style={{ animationDelay: delay }}>
      <span className="text-base">{icon}</span>
      <span className="font-medium tracking-wide">{label}</span>
    </div>
  );
}