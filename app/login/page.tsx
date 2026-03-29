import { LoginForm } from "./LoginForm"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base px-4">
      <div className="w-full max-w-xs">
        {/* Heading */}
        <div className="text-center mb-8">
          <p className="font-mono text-ink3 text-[0.6rem] tracking-[0.22em] uppercase mb-2">
            Personalized Lean Gain Plan
          </p>
          <h1 className="font-serif text-[2rem] font-semibold italic text-ink leading-tight tracking-tight">
            Diet Plan
          </h1>
        </div>

        {/* Card */}
        <div className="bg-panel border border-rim rounded-xl px-6 py-7 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
