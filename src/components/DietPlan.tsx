import { useState } from "react";

const meals = [
  {
    time: "7:00 – 8:00 AM",
    label: "Breakfast",
    emoji: "🌅",
    accent: "amber",
    items: [
      { name: "Whole eggs (boiled/scrambled)", qty: "3 eggs", p: 18, c: 1, f: 15 },
      { name: "Multigrain / brown bread toast", qty: "2 slices", p: 6, c: 26, f: 2 },
      { name: "Banana", qty: "1 medium", p: 1, c: 23, f: 0 },
    ],
    note: "Eggs are the protein anchor of this plan. Have them any style — boiled is easiest.",
  },
  {
    time: "10:30 – 11:00 AM",
    label: "Mid-Morning Snack",
    emoji: "🍎",
    accent: "emerald",
    items: [
      { name: "Curd (plain, full-fat)", qty: "150g", p: 5, c: 6, f: 4 },
      { name: "Mixed fruit (apple / papaya / guava)", qty: "100g", p: 1, c: 15, f: 0 },
    ],
    note: "Curd gives probiotics + protein. Avoid flavoured curd — too much sugar.",
  },
  {
    time: "1:00 – 1:30 PM",
    label: "Lunch",
    emoji: "🍱",
    accent: "indigo",
    items: [
      { name: "Cooked rice or chapati", qty: "1 cup / 2 roti", p: 5, c: 45, f: 2 },
      { name: "Dal (masoor / moong / chana)", qty: "1 cup cooked", p: 12, c: 20, f: 1 },
      { name: "Paneer bhurji / curry", qty: "80g paneer", p: 14, c: 3, f: 11 },
      { name: "Sabzi (seasonal vegetable)", qty: "1 cup", p: 2, c: 10, f: 2 },
    ],
    note: "Dal + paneer together gives a complete amino acid profile. Don't skip dal.",
  },
  {
    time: "4:00 – 4:30 PM",
    label: "Evening Snack",
    emoji: "🥜",
    accent: "orange",
    items: [
      { name: "Roasted chana / peanuts", qty: "30g", p: 7, c: 10, f: 5 },
      { name: "Boiled egg (optional top-up)", qty: "1 egg", p: 6, c: 0, f: 5 },
    ],
    note: "Keeps energy stable through the evening. Skip the egg if lunch was heavy.",
  },
  {
    time: "7:30 – 8:00 PM",
    label: "Dinner",
    emoji: "🌙",
    accent: "violet",
    items: [
      { name: "Chapati", qty: "2 roti", p: 5, c: 30, f: 2 },
      { name: "Chickpeas / rajma / chhole curry", qty: "1 cup cooked", p: 13, c: 25, f: 2 },
      { name: "Mixed salad (cucumber, tomato, carrot)", qty: "1 bowl", p: 2, c: 8, f: 0 },
    ],
    note: "Keep dinner moderate. Legumes digest well overnight and support muscle repair.",
  },
  {
    time: "9:30 – 10:00 PM",
    label: "Night Snack",
    emoji: "🌛",
    accent: "slate",
    items: [
      { name: "Peanut butter", qty: "1 tbsp (15g)", p: 4, c: 3, f: 8 },
      { name: "Multigrain cracker or banana", qty: "1 pc", p: 1, c: 15, f: 0 },
    ],
    note: "Only if hungry. Slow-digesting fats prevent overnight muscle breakdown.",
  },
];

const tips = [
  { icon: "💧", text: "2.5–3L water daily — aids metabolism and reduces bloating" },
  { icon: "🥚", text: "Eggs are your #1 protein source — aim for 3–4/day across meals" },
  { icon: "🧀", text: "Paneer (80–100g/day) fills the gap since milk is avoided" },
  { icon: "🚶‍♀️", text: "20–30 min brisk walk daily keeps the calorie surplus lean" },
  { icon: "🍽️", text: "Eat within 30–45 min of waking — kick-starts metabolism" },
  { icon: "⏰", text: "Keep 3–4 hr gaps between meals, never skip — consistency is everything" },
];

const accentMap = {
  amber:   { border: "border-amber-500/30",  text: "text-amber-400",   bg: "bg-amber-500/10",   dot: "bg-amber-400" },
  emerald: { border: "border-emerald-500/30", text: "text-emerald-400", bg: "bg-emerald-500/10", dot: "bg-emerald-400" },
  indigo:  { border: "border-indigo-500/30",  text: "text-indigo-400",  bg: "bg-indigo-500/10",  dot: "bg-indigo-400" },
  orange:  { border: "border-orange-500/30",  text: "text-orange-400",  bg: "bg-orange-500/10",  dot: "bg-orange-400" },
  violet:  { border: "border-violet-500/30",  text: "text-violet-400",  bg: "bg-violet-500/10",  dot: "bg-violet-400" },
  slate:   { border: "border-slate-500/30",   text: "text-slate-400",   bg: "bg-slate-500/10",   dot: "bg-slate-400" },
};

const mealKcal = (items) => items.reduce((a, x) => a + x.p * 4 + x.c * 4 + x.f * 9, 0);
const totals = meals.reduce((acc, m) => {
  m.items.forEach(i => { acc.p += i.p; acc.c += i.c; acc.f += i.f; });
  return acc;
}, { p: 0, c: 0, f: 0 });
const totalKcal = totals.p * 4 + totals.c * 4 + totals.f * 9;

export default function DietPlan() {
  const [open, setOpen] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 max-w-xl mx-auto">

      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Personalized Lean Gain Plan</p>
        <h1 className="text-2xl font-bold text-white">🥗 Daily Diet Plan</h1>
        <p className="text-xs text-slate-500 mt-1">4'11" · 48 kg · No Gym · Light Activity</p>
      </div>

      {/* Macro Summary */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { label: "Calories", val: `~${totalKcal}`, unit: "kcal", cls: "text-amber-400 border-amber-500/30" },
          { label: "Protein",  val: `~${totals.p}g`, unit: "daily", cls: "text-emerald-400 border-emerald-500/30" },
          { label: "Carbs",    val: `~${totals.c}g`, unit: "daily", cls: "text-indigo-400 border-indigo-500/30" },
          { label: "Fats",     val: `~${totals.f}g`, unit: "daily", cls: "text-orange-400 border-orange-500/30" },
        ].map(m => (
          <div key={m.label} className={`bg-slate-900 rounded-xl p-3 text-center border ${m.cls}`}>
            <p className={`text-lg font-bold ${m.cls.split(" ")[0]}`}>{m.val}</p>
            <p className="text-xs text-slate-500 mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Meal Cards */}
      <div className="flex flex-col gap-3 mb-6">
        {meals.map((meal, i) => {
          const a = accentMap[meal.accent];
          const isOpen = open === i;
          return (
            <div key={i} className={`bg-slate-900 rounded-2xl border ${a.border} overflow-hidden`}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{meal.emoji}</span>
                  <div>
                    <p className={`font-semibold text-sm ${a.text}`}>{meal.label}</p>
                    <p className="text-xs text-slate-500">{meal.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">~{mealKcal(meal.items)} kcal</span>
                  <span className={`text-xs ${a.text}`}>{isOpen ? "▲" : "▼"}</span>
                </div>
              </button>

              {isOpen && (
                <div className={`px-4 pb-4 border-t ${a.border}`}>
                  <table className="w-full text-xs mt-3">
                    <thead>
                      <tr className="text-slate-500">
                        <th className="text-left pb-2 font-medium">Food</th>
                        <th className="text-right pb-2 font-medium">Qty</th>
                        <th className="text-right pb-2 font-medium text-emerald-500">P</th>
                        <th className="text-right pb-2 font-medium text-indigo-400">C</th>
                        <th className="text-right pb-2 font-medium text-orange-400">F</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meal.items.map((item, j) => (
                        <tr key={j} className="border-t border-slate-800">
                          <td className="py-2 text-slate-200">{item.name}</td>
                          <td className="py-2 text-right text-slate-400 pl-2 whitespace-nowrap">{item.qty}</td>
                          <td className="py-2 text-right text-emerald-400 pl-2">{item.p}g</td>
                          <td className="py-2 text-right text-indigo-400 pl-2">{item.c}g</td>
                          <td className="py-2 text-right text-orange-400 pl-2">{item.f}g</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className={`mt-3 px-3 py-2 rounded-lg text-xs text-slate-300 ${a.bg} border-l-2 ${a.border}`}>
                    💡 {meal.note}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4">
        <p className="font-semibold text-sm text-white mb-3">📌 Key Guidelines</p>
        <div className="flex flex-col gap-2.5">
          {tips.map((t, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
              <span className="text-base leading-none mt-0.5">{t.icon}</span>
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-slate-600 mt-4">Tap any meal to expand · Macros are approximate</p>
    </div>
  );
}