import { tips } from "./data";

export default function Guidelines() {
  return (
    <div className="bg-panel border border-rim2 rounded-2xl p-4 flex flex-col gap-3">
      {tips.map((t, i) => (
        <div key={i} className="flex gap-2.5 items-start">
          <span className="text-[0.95rem] leading-6 shrink-0">{t.icon}</span>
          <span className="text-[0.73rem] text-ink2 leading-relaxed">{t.text}</span>
        </div>
      ))}
    </div>
  );
}
