"use client"

import React, { useState, forwardRef } from "react"

// Simple classNames helper
const clsx = (...args) => args.filter(Boolean).join(" ")

// Button component
function Button({ className, ...props }) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md border bg-foreground px-4 py-2 text-sm font-medium text-background",
        "hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

// Input component
const Input = forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={clsx(
      "w-full rounded-md border bg-background px-3 py-2 text-sm",
      "placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    {...props}
  />
))
Input.displayName = "Input"

// Checkbox component
function Checkbox({ className, ...props }) {
  return (
    <input
      type="checkbox"
      className={clsx(
        "h-4 w-4 rounded border border-input accent-foreground",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    />
  )
}

// Alert component
function Alert({ title, children, className }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={clsx(
        "rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
        className
      )}
    >
      <p className="font-medium">{title}</p>
      {children ? <div className="mt-1 text-destructive/90">{children}</div> : null}
    </div>
  )
}

// Icons
function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
      />
    </svg>
  )
}

function LockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M17 9h-1V7a4 4 0 1 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-6 0V7a2 2 0 1 1 4 0v2h-4Zm2 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
      />
    </svg>
  )
}

function Spinner(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      className={clsx("animate-spin", props.className)}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-20 fill-none" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" className="opacity-80 fill-none" />
    </svg>
  )
}

// LoginForm component
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const data = new FormData(e.currentTarget)
    const email = data.get("email") || ""
    const password = data.get("password") || ""
    const remember = data.get("remember") === "on"

    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 600))
      window.location.assign("/dashboard")
    } catch (err) {
      setError(err?.message || "Login failed. Please check your credentials and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" aria-label="Login form">
      {error && <Alert title="Couldn’t sign you in">{error}</Alert>}

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-muted-foreground">
            <MailIcon />
          </span>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <button
            type="button"
            className="text-xs text-muted-foreground underline underline-offset-4"
            onClick={() => setShowPassword((s) => !s)}
            aria-pressed={showPassword}
            aria-controls="password"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-muted-foreground">
            <LockIcon />
          </span>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            required
            aria-describedby="password-hint"
            className="pl-9"
          />
        </div>
        <p id="password-hint" className="text-xs text-muted-foreground">
          Keep your password secure. Do not share it with anyone.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="remember" className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox id="remember" name="remember" />
          <span>Remember me</span>
        </label>
        <a href="/forgot-password" className="text-xs underline underline-offset-4 text-muted-foreground">
          Forgot password?
        </a>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Spinner /> Logging in…
          </span>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  )
}
