export type Accent = "amber" | "emerald" | "indigo" | "orange" | "violet" | "slate";

export interface MealItem {
  name: string;
  qty: string;
  p: number;
  c: number;
  f: number;
}

export interface Meal {
  time: string;
  label: string;
  emoji: string;
  accent: Accent;
  items: MealItem[];
  note: string;
}

export interface Tip {
  icon: string;
  text: string;
}

// CSS variables defined in globals.css — one per meal accent, override in .dark
export const accentVar: Record<Accent, string> = {
  amber:   "var(--meal-amber)",
  emerald: "var(--meal-emerald)",
  indigo:  "var(--meal-indigo)",
  orange:  "var(--meal-orange)",
  violet:  "var(--meal-violet)",
  slate:   "var(--meal-slate)",
};

export const mealKcal = (items: MealItem[]) =>
  items.reduce((a, x) => a + x.p * 4 + x.c * 4 + x.f * 9, 0);

export const meals: Meal[] = [
  {
    time: "7:00 – 8:00 AM",
    label: "Breakfast",
    emoji: "🌅",
    accent: "amber",
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
    accent: "emerald",
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
    accent: "indigo",
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
    accent: "orange",
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
    accent: "violet",
    items: [
      { name: "Chapati",                                qty: "2 roti",  p: 5,  c: 30, f: 2 },
      { name: "Chickpeas / rajma / chhole curry",       qty: "1 cup",   p: 13, c: 25, f: 2 },
      { name: "Mixed salad (cucumber, tomato, carrot)", qty: "1 bowl",  p: 2,  c: 8,  f: 0 },
    ],
    note: "Keep dinner moderate. Legumes digest well overnight and support muscle repair.",
  },
  {
    time: "9:30 – 10:00 PM",
    label: "Night Snack",
    emoji: "🌛",
    accent: "slate",
    items: [
      { name: "Peanut butter",                qty: "1 tbsp (15g)", p: 4, c: 3,  f: 8 },
      { name: "Multigrain cracker or banana", qty: "1 pc",         p: 1, c: 15, f: 0 },
    ],
    note: "Only if hungry. Slow-digesting fats prevent overnight muscle breakdown.",
  },
];

export const tips: Tip[] = [
  { icon: "💧", text: "2.5–3L water daily — aids metabolism and reduces bloating" },
  { icon: "🥚", text: "Eggs are your #1 protein source — aim for 3–4/day across meals" },
  { icon: "🧀", text: "Paneer (80–100g/day) fills the gap since milk is avoided" },
  { icon: "🚶", text: "20–30 min brisk walk daily keeps the calorie surplus lean" },
  { icon: "🍽️", text: "Eat within 30–45 min of waking — kick-starts metabolism" },
  { icon: "⏰", text: "Keep 3–4 hr gaps between meals, never skip — consistency is everything" },
];

export const totals = meals.reduce(
  (acc, m) => { m.items.forEach(i => { acc.p += i.p; acc.c += i.c; acc.f += i.f; }); return acc; },
  { p: 0, c: 0, f: 0 }
);

export const totalKcal = totals.p * 4 + totals.c * 4 + totals.f * 9;
