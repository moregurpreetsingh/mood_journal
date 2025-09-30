// src/pages/LoginPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* Left panel */}
      <section
        className="hidden md:flex flex-col justify-between border-r border-gray-200 bg-white p-8"
        aria-label="Welcome panel"
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">Mood Journal App</h1>
            <p className="mt-2 text-gray-500 max-w-xl">
              Log daily moods and activities, track trends, and gain insights over time.
            </p>
          </div>

          {/* Illustration placeholder */}
          <div className="w-full rounded-xl border bg-gray-100 aspect-[4/3] flex items-center justify-center overflow-hidden">
            {/* Use <img> or next/Image equivalent if available */}
            <div className="text-gray-300 text-center">
              <svg className="mx-auto mb-2" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4" strokeWidth="1.5"></path>
                <rect x="3" y="3" width="18" height="12" rx="2" strokeWidth="1.5"></rect>
                <path d="M8 10l2-2 3 3 4-4 2 2" strokeWidth="1.5"></path>
              </svg>
              <div className="text-sm text-gray-400">Illustration placeholder</div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">Your data stays private. You can export entries anytime.</p>
      </section>

      {/* Right panel */}
      <section className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
          <header className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
            <p className="text-gray-500 mt-1">Welcome back—track how you feel today.</p>
          </header>

          <LoginForm />

          <div className="text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="underline underline-offset-4 text-gray-900">
              Register
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
