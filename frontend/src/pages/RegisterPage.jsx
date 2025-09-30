import React from "react"
import RegisterForm from "../components/auth/RegisterForm"
import { Link } from "react-router-dom"

export default function RegisterPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <section className="hidden md:flex flex-col justify-between border-r bg-gray-100 text-gray-900 p-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Create account</h1>
            <p className="mt-2 text-gray-500">Join Mood Journal to track your moods and get weekly insights.</p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">[Illustration Placeholder]</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">Your entries are private by default.</p>
      </section>

      <section className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Register</h2>
            <p className="text-gray-500">Create an account to start logging moods.</p>
          </div>

          <RegisterForm />

          <div className="text-sm text-gray-500 mt-4">
            Already have an account? <Link to="/" className="underline">Login</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
