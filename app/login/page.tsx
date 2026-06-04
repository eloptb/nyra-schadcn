import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">

      {/* ── Card split ───────────────────────────── */}
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl shadow-lg grid grid-cols-2 bg-card">

        {/* ── Left — Form ──────────────────────────── */}
        <div className="flex flex-col justify-center gap-6 px-10 py-12">

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Partner Portal</h1>
            <p className="text-sm text-muted-foreground">
              Manage access to Genero AI Intelligence.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@company.com"
                className="bg-background"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                className="bg-background"
              />
            </div>

            {/* Submit */}
            <Button className="w-full font-semibold" size="lg">
              Login
            </Button>

          </div>

          {/* Sign up */}
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-foreground font-medium underline underline-offset-4 hover:text-primary transition-colors">
              Sign up
            </a>
          </p>

        </div>

        {/* ── Right — Image ────────────────────────── */}
        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=800&q=80"
            alt="Landscape"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </div>

      {/* ── Footer ───────────────────────────────── */}
      <p className="mt-8 text-xs text-muted-foreground">
        System Build 2026.5.31.1334
      </p>

    </div>
  )
}
