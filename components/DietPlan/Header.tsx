"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true) }, []);

  const dark = resolvedTheme === "dark";

  return (
    <header className="text-center mb-9">
      <p className="font-mono text-ink3 text-[0.6rem] tracking-[0.22em] uppercase mb-2">
        Personalized Lean Gain Plan
      </p>

      <div className="flex items-center justify-center gap-3 mb-1">
        <h1 className="font-serif text-[2rem] font-semibold italic text-ink leading-tight tracking-tight">
          Daily Nutrition
        </h1>
        <button
          onClick={() => setTheme(dark ? "light" : "dark")}
          aria-label="Toggle theme"
          className="mt-1 w-8 h-8 rounded-full bg-panel border border-rim2 flex items-center justify-center text-ink2 hover:text-ink hover:border-rim transition-colors cursor-pointer"
        >
          <span className="text-sm leading-none">{mounted ? (dark ? "☀️" : "🌙") : "🌙"}</span>
        </button>
      </div>

      <p className="font-mono text-ink3 text-[0.62rem] tracking-wide">
        4′11″ · 48 kg · No Gym · Light Activity
      </p>
    </header>
  );
}
