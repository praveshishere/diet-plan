import Header from "./Header";
import MacroSummary from "./MacroSummary";
import MealList from "./MealList";
import Guidelines from "./Guidelines";
import SectionDivider from "./SectionDivider";

export default function DietPlan() {
  return (
    <div className="min-h-screen bg-base text-ink font-sans px-5 py-8 max-w-[480px] mx-auto">
      <Header />
      <MacroSummary />

      <SectionDivider label="Daily Meals" />
      <MealList />

      <SectionDivider label="Key Guidelines" />
      <Guidelines />

      <p className="font-mono text-center text-[0.58rem] text-ink3 tracking-wide mt-8">
        Tap any meal to expand · Macros are approximate
      </p>
    </div>
  );
}
