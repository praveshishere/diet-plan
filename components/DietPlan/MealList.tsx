import { meals } from "./data";
import MealCard from "./MealCard";

export default function MealList() {
  return (
    <div className="relative mb-10">
      {/* Vertical timeline line */}
      <div
        className="absolute left-[18px] top-4 bottom-4 w-px"
        style={{ background: "linear-gradient(to bottom, var(--rim), var(--rim2) 85%, transparent)" }}
      />

      {meals.map((meal, i) => (
        <MealCard key={i} meal={meal} />
      ))}
    </div>
  );
}
