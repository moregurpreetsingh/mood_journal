import React from "react"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <p className="mb-4">Page not found</p>
        <Link to="/" className="underline text-blue-600">Go to home</Link>
      </div>
    </div>
  )
}
