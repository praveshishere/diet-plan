"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError("Invalid email or password.")
      setLoading(false)
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="font-mono text-ink3 text-[0.65rem] tracking-widest uppercase"
        >
          Email
        </Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-10 bg-panel2 border-rim text-ink placeholder:text-ink3 focus-visible:border-accent focus-visible:ring-accent/20"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="font-mono text-ink3 text-[0.65rem] tracking-widest uppercase"
        >
          Password
        </Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          className="h-10 bg-panel2 border-rim text-ink placeholder:text-ink3 focus-visible:border-accent focus-visible:ring-accent/20"
        />
      </div>

      {error && (
        <p className="font-mono text-[0.72rem] text-fat">{error}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-10 mt-1 font-mono text-xs tracking-widest uppercase"
      >
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  )
}
