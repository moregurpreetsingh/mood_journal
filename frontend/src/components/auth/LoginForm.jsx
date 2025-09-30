// src/components/auth/LoginForm.jsx
import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // call your backend API here, example:
      // const res = await fetch("http://localhost:8080/users/login", {...})
      // if (!res.ok) throw new Error(await res.text());
      // const user = await res.json();
      // localStorage.setItem("user", JSON.stringify(user));
      // window.location.href = "/dashboard";
      await new Promise((r) => setTimeout(r, 700)); // demo
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" aria-label="Login form">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {/* small mail icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 8l9 6 9-6"/></svg>
          </span>
          <input
            id="email"
            type="email"
            className="w-full border rounded-lg pl-11 pr-3 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <button
            type="button"
            className="text-xs text-gray-500 underline underline-offset-4"
            onClick={() => setShow(!show)}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {/* lock icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>

          <input
            id="password"
            type={show ? "text" : "password"}
            className="w-full border rounded-lg pl-11 pr-10 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-describedby="password-hint"
          />

          <button
            type="button"
            aria-hidden
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {/* eye icon */}
            {show ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17.94 17.94A10 10 0 0 1 6.06 6.06"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z"/></svg>
            )}
          </button>
        </div>

        <p id="password-hint" className="text-xs text-gray-500">Keep your password secure. Do not share it with anyone.</p>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="form-checkbox w-4 h-4" />
          <span>Remember me</span>
        </label>
        <a className="text-sm underline text-gray-600" href="/forgot-password">Forgot password?</a>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white text-lg font-medium py-3 rounded-lg disabled:opacity-60"
      >
        {loading ? "Logging in…" : "Login"}
      </button>
    </form>
  );
}
