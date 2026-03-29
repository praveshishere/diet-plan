"use client";

import { useState } from "react";
import { accentVar, mealKcal, type Meal } from "./data";

export default function MealCard({ meal }: { meal: Meal }) {
  const [isOpen, setIsOpen] = useState(false);
  const color = accentVar[meal.accent];

  return (
    <div className="relative pl-11.5 not-last:mb-3.5">
      {/* Timeline dot */}
      <div
        className="absolute left-2.25 top-3.5 size-4.5 rounded-full flex items-center justify-center bg-base transition-shadow duration-200"
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
          onClick={() => setIsOpen(prev => !prev)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-transparent border-none cursor-pointer text-left"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl leading-none">{meal.emoji}</span>
            <div>
              <p className="font-bold text-[0.82rem] leading-snug tracking-wide" style={{ color }}>
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
}
