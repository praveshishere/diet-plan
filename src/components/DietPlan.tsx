import { useEffect, useState } from "react";

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const meals = [
  {
    time: "7:00 – 8:00 AM",
    label: "Breakfast",
    emoji: "🌅",
    accent: "amber" as const,
    items: [
      { name: "Whole eggs (boiled/scrambled)",  qty: "3 eggs",   p: 18, c: 1,  f: 15 },
      { name: "Multigrain / brown bread toast", qty: "2 slices", p: 6,  c: 26, f: 2  },
      { name: "Banana",                         qty: "1 medium", p: 1,  c: 23, f: 0  },
    ],
    note: "Eggs are the protein anchor of this plan. Have them any style — boiled is easiest.",
  },
  {
    time: "10:30 – 11:00 AM",
    label: "Mid-Morning Snack",
    emoji: "🍎",
    accent: "emerald" as const,
    items: [
      { name: "Curd (plain, full-fat)",           qty: "150g", p: 5, c: 6,  f: 4 },
      { name: "Mixed fruit (apple/papaya/guava)", qty: "100g", p: 1, c: 15, f: 0 },
    ],
    note: "Curd gives probiotics + protein. Avoid flavoured curd — too much sugar.",
  },
  {
    time: "1:00 – 1:30 PM",
    label: "Lunch",
    emoji: "🍱",
    accent: "indigo" as const,
    items: [
      { name: "Cooked rice or chapati",        qty: "1 cup / 2 roti", p: 5,  c: 45, f: 2  },
      { name: "Dal (masoor/moong/chana)",       qty: "1 cup cooked",   p: 12, c: 20, f: 1  },
      { name: "Paneer bhurji / curry",          qty: "80g paneer",     p: 14, c: 3,  f: 11 },
      { name: "Sabzi (seasonal vegetable)",     qty: "1 cup",          p: 2,  c: 10, f: 2  },
    ],
    note: "Dal + paneer together gives a complete amino acid profile. Don't skip dal.",
  },
  {
    time: "4:00 – 4:30 PM",
    label: "Evening Snack",
    emoji: "🥜",
    accent: "orange" as const,
    items: [
      { name: "Roasted chana / peanuts",      qty: "30g",   p: 7, c: 10, f: 5 },
      { name: "Boiled egg (optional top-up)", qty: "1 egg", p: 6, c: 0,  f: 5 },
    ],
    note: "Keeps energy stable through the evening. Skip the egg if lunch was heavy.",
  },
  {
    time: "7:30 – 8:00 PM",
    label: "Dinner",
    emoji: "🌙",
    accent: "violet" as const,
    items: [
      { name: "Chapati",                               qty: "2 roti",  p: 5,  c: 30, f: 2 },
      { name: "Chickpeas / rajma / chhole curry",      qty: "1 cup",   p: 13, c: 25, f: 2 },
      { name: "Mixed salad (cucumber, tomato, carrot)", qty: "1 bowl", p: 2,  c: 8,  f: 0 },
    ],
    note: "Keep dinner moderate. Legumes digest well overnight and support muscle repair.",
  },
  {
    time: "9:30 – 10:00 PM",
    label: "Night Snack",
    emoji: "🌛",
    accent: "slate" as const,
    items: [
      { name: "Peanut butter",               qty: "1 tbsp (15g)", p: 4, c: 3,  f: 8 },
      { name: "Multigrain cracker or banana", qty: "1 pc",        p: 1, c: 15, f: 0 },
    ],
    note: "Only if hungry. Slow-digesting fats prevent overnight muscle breakdown.",
  },
];

const tips = [
  { icon: "💧", text: "2.5–3L water daily — aids metabolism and reduces bloating" },
  { icon: "🥚", text: "Eggs are your #1 protein source — aim for 3–4/day across meals" },
  { icon: "🧀", text: "Paneer (80–100g/day) fills the gap since milk is avoided" },
  { icon: "🚶", text: "20–30 min brisk walk daily keeps the calorie surplus lean" },
  { icon: "🍽️", text: "Eat within 30–45 min of waking — kick-starts metabolism" },
  { icon: "⏰", text: "Keep 3–4 hr gaps between meals, never skip — consistency is everything" },
];

/* ─── Types & helpers ────────────────────────────────────────────────────────── */
type Accent = "amber" | "emerald" | "indigo" | "orange" | "violet" | "slate";

// CSS variables defined in index.css — one per meal accent, override in .dark
const accentVar: Record<Accent, string> = {
  amber:   "var(--meal-amber)",
  emerald: "var(--meal-emerald)",
  indigo:  "var(--meal-indigo)",
  orange:  "var(--meal-orange)",
  violet:  "var(--meal-violet)",
  slate:   "var(--meal-slate)",
};

const mealKcal = (items: typeof meals[0]["items"]) =>
  items.reduce((a, x) => a + x.p * 4 + x.c * 4 + x.f * 9, 0);

const totals = meals.reduce(
  (acc, m) => { m.items.forEach(i => { acc.p += i.p; acc.c += i.c; acc.f += i.f; }); return acc; },
  { p: 0, c: 0, f: 0 }
);
const totalKcal = totals.p * 4 + totals.c * 4 + totals.f * 9;

/* ─── Component ──────────────────────────────────────────────────────────────── */
export default function DietPlan() {
  const [open, setOpen] = useState<number | null>(null);
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark") ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      : true
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-base text-ink font-sans px-5 py-8 max-w-[480px] mx-auto">

      {/* ── Header ── */}
      <header className="text-center mb-9">
        <p className="font-mono text-ink3 text-[0.6rem] tracking-[0.22em] uppercase mb-2">
          Personalized Lean Gain Plan
        </p>

        <div className="flex items-center justify-center gap-3 mb-1">
          <h1 className="font-serif text-[2rem] font-semibold italic text-ink leading-tight tracking-tight">
            Daily Nutrition
          </h1>
          {/* Dark / Light toggle */}
          <button
            onClick={() => setDark(d => !d)}
            aria-label="Toggle theme"
            className="mt-1 w-8 h-8 rounded-full bg-panel border border-rim2 flex items-center justify-center text-ink2 hover:text-ink hover:border-rim transition-colors cursor-pointer"
          >
            <span className="text-sm leading-none">{dark ? "☀️" : "🌙"}</span>
          </button>
        </div>

        <p className="font-mono text-ink3 text-[0.62rem] tracking-wide">
          4′11″ · 48 kg · No Gym · Light Activity
        </p>
      </header>

      {/* ── Macro Summary ── */}
      <div className="grid grid-cols-4 gap-2 mb-10">
        {[
          { label: "Calories", val: `~${totalKcal}`, color: "text-kcal",    border: "border-t-kcal"    },
          { label: "Protein",  val: `~${totals.p}g`, color: "text-protein", border: "border-t-protein" },
          { label: "Carbs",    val: `~${totals.c}g`, color: "text-carbs",   border: "border-t-carbs"   },
          { label: "Fats",     val: `~${totals.f}g`, color: "text-fat",     border: "border-t-fat"     },
        ].map(m => (
          <div
            key={m.label}
            className={`bg-panel border border-rim2 border-t-2 ${m.border} rounded-xl py-3 px-1 text-center`}
          >
            <p className={`font-mono font-medium text-[0.85rem] leading-none mb-1 ${m.color}`}>{m.val}</p>
            <p className="text-ink3 text-[0.58rem] tracking-wide">{m.label}</p>
          </div>
        ))}
      </div>

      {/* ── Meals ── */}
      <SectionDivider label="Daily Meals" />

      <div className="relative mb-10">
        {/* Vertical timeline line */}
        <div
          className="absolute left-[18px] top-4 bottom-4 w-px"
          style={{ background: "linear-gradient(to bottom, var(--rim), var(--rim2) 85%, transparent)" }}
        />

        {meals.map((meal, i) => {
          const color = accentVar[meal.accent];
          const isOpen = open === i;

          return (
            <div
              key={i}
              className={`relative pl-[46px] ${i < meals.length - 1 ? "mb-3.5" : ""}`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-[9px] top-[14px] size-[18px] rounded-full flex items-center justify-center bg-base transition-shadow duration-200"
                style={{
                  border: `1.5px solid ${color}`,
                  boxShadow: isOpen ? `0 0 8px color-mix(in srgb, ${color} 45%, transparent)` : "none",
                }}
              >
                <div
                  className="size-1.5 rounded-full transition-opacity duration-200"
                  style={{ background: color, opacity: isOpen ? 1 : 0.45 }}
                />
              </div>

              {/* Card */}
              <div
                className="bg-panel rounded-2xl overflow-hidden transition-colors duration-200"
                style={{
                  border: "1px solid",
                  borderColor: isOpen
                    ? `color-mix(in srgb, ${color} 28%, transparent)`
                    : "var(--rim2)",
                }}
              >
                {/* Row */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 bg-transparent border-none cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl leading-none">{meal.emoji}</span>
                    <div>
                      <p
                        className="font-bold text-[0.82rem] leading-snug tracking-wide"
                        style={{ color }}
                      >
                        {meal.label}
                      </p>
                      <p className="font-mono text-ink3 text-[0.6rem]">{meal.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="font-mono text-ink2 text-[0.65rem]">
                      ~{mealKcal(meal.items)} kcal
                    </span>
                    <span
                      className="text-[0.55rem] inline-block transition-transform duration-200"
                      style={{ color, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      ▼
                    </span>
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div
                    className="meal-detail px-3.5 pb-3.5"
                    style={{ borderTop: `1px solid color-mix(in srgb, ${color} 18%, transparent)` }}
                  >
                    <table className="w-full border-collapse text-[0.7rem] mt-3">
                      <thead>
                        <tr>
                          <th className="font-mono font-normal text-ink3 text-left pb-2 text-[0.6rem] tracking-wide">Food</th>
                          <th className="font-mono font-normal text-ink3 text-right pb-2 text-[0.6rem]">Qty</th>
                          <th className="font-mono font-medium text-protein text-right pb-2 text-[0.6rem]">P</th>
                          <th className="font-mono font-medium text-carbs  text-right pb-2 text-[0.6rem]">C</th>
                          <th className="font-mono font-medium text-fat    text-right pb-2 text-[0.6rem]">F</th>
                        </tr>
                      </thead>
                      <tbody>
                        {meal.items.map((item, j) => (
                          <tr key={j} className="border-t border-rim2">
                            <td className="py-[0.42rem] text-ink">{item.name}</td>
                            <td className="py-[0.42rem] text-right text-ink2 font-mono pl-2 whitespace-nowrap">{item.qty}</td>
                            <td className="py-[0.42rem] text-right text-protein font-mono pl-2">{item.p}g</td>
                            <td className="py-[0.42rem] text-right text-carbs  font-mono pl-2">{item.c}g</td>
                            <td className="py-[0.42rem] text-right text-fat    font-mono pl-2">{item.f}g</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Note */}
                    <div
                      className="mt-3 rounded-lg px-3 py-2 text-[0.7rem] text-ink2 leading-relaxed"
                      style={{
                        background: `color-mix(in srgb, ${color} 8%, transparent)`,
                        borderLeft: `2px solid ${color}`,
                      }}
                    >
                      {meal.note}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Guidelines ── */}
      <SectionDivider label="Key Guidelines" />

      <div className="bg-panel border border-rim2 rounded-2xl p-4 flex flex-col gap-3">
        {tips.map((t, i) => (
          <div key={i} className="flex gap-2.5 items-start">
            <span className="text-[0.95rem] leading-6 shrink-0">{t.icon}</span>
            <span className="text-[0.73rem] text-ink2 leading-relaxed">{t.text}</span>
          </div>
        ))}
      </div>

      <p className="font-mono text-center text-[0.58rem] text-ink3 tracking-wide mt-8">
        Tap any meal to expand · Macros are approximate
      </p>
    </div>
  );
}

/* ─── SectionDivider ─────────────────────────────────────────────────────────── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-ink3 text-[0.58rem] tracking-[0.2em] uppercase whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-rim" />
    </div>
  );
}
