import React from "react"
import { Link, useLocation } from "react-router-dom" // Or use Next.js imports
import { LayoutDashboard, BarChart3, User } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/insights", label: "Weekly Insights", icon: BarChart3 },
  { href: "/profile", label: "Profile", icon: User },
]

export default function AppSidebar() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <>
      <aside className="app-sidebar" aria-label="Primary">
        <div className="sidebar-header">
          <Link to="/" aria-label="Mood Dashboard Home" className="sidebar-brand">
            <div className="brand-icon" aria-hidden="true" />
            <span className="brand-title">Mood</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`nav-item ${isActive ? "active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Link to="/profile" className="profile-link" aria-label="Go to profile">
            <div className="profile-avatar" aria-hidden="true" />
            <div className="profile-info">
              <span className="profile-name">Your Profile</span>
              <span className="profile-subtext">Manage account</span>
            </div>
          </Link>
        </div>
      </aside>

      <style>{`
        .app-sidebar {
          position: fixed;
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 260px;
          background-color: #f9fafb;
          color: #374151;
          border-right: 1px solid #e5e7eb;
          font-family: sans-serif;
        }

        .sidebar-header {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: inherit;
        }

        .brand-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background-color: #000000;
        }

        .brand-title {
          font-weight: 600;
          font-size: 1.125rem;
          letter-spacing: -0.5px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem;
        }

        .nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          text-decoration: none;
          color: #374151;
          font-size: 0.95rem;
          transition: background-color 0.2s, color 0.2s;
        }

        .nav-item:hover {
          background-color: #e5e7eb;
        }

        .nav-item.active {
            background-color: #333333; /* dark gray */
            color: #e0e0e0; /* light gray text */
          }
          

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .profile-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: inherit;
          border-radius: 8px;
          padding: 0.5rem;
          transition: background-color 0.2s;
        }

        .profile-link:hover {
          background-color: #e5e7eb;
        }

        .profile-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #000000;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
        }

        .profile-name {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .profile-subtext {
          font-size: 0.75rem;
          color: #9ca3af;
        }
      `}</style>
    </>
  )
}
