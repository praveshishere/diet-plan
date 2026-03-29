import { totals, totalKcal } from "./data";

const macros = [
  { label: "Calories", val: `~${totalKcal}`, color: "text-kcal",    border: "border-t-kcal"    },
  { label: "Protein",  val: `~${totals.p}g`, color: "text-protein", border: "border-t-protein" },
  { label: "Carbs",    val: `~${totals.c}g`, color: "text-carbs",   border: "border-t-carbs"   },
  { label: "Fats",     val: `~${totals.f}g`, color: "text-fat",     border: "border-t-fat"     },
];

export default function MacroSummary() {
  return (
    <div className="grid grid-cols-4 gap-2 mb-10">
      {macros.map(m => (
        <div
          key={m.label}
          className={`bg-panel border border-rim2 border-t-2 ${m.border} rounded-xl py-3 px-1 text-center`}
        >
          <p className={`font-mono font-medium text-[0.85rem] leading-none mb-1 ${m.color}`}>{m.val}</p>
          <p className="text-ink3 text-[0.58rem] tracking-wide">{m.label}</p>
        </div>
      ))}
    </div>
  );
}
