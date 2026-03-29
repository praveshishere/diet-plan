export default function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-ink3 text-[0.58rem] tracking-[0.2em] uppercase whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-rim" />
    </div>
  );
}
