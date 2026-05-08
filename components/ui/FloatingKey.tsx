export function FloatingKey({ children, className }: { children: React.ReactNode; className: string }) {
  // Utilizing the custom .key-cap class from globals.css
  return (
    <div className={`absolute key-cap animate-float px-3 py-2 cursor-default ${className}`}>
      {children}
    </div>
  );
}