import React from "react"
import "./globals.css"

export default function Layout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <body className="font-sans">{children}</body>
    </html>
  )
}
