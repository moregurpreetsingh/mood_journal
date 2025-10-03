"use client";

import React, { useState } from "react";
import SideMenu from "../../components/SideMenu";
import { useUser } from "../../contexts/UserContext";

export default function ProfilePage() {

    const { userId } = useUser();
  console.log("userId received by DashboardPage:", userId);

  const [email, setEmail] = useState("user@example.com");
  const [username, setUsername] = useState("mood-user");

  function handleProfileSave(e) {
    e.preventDefault();
    console.log("[v0] Save profile", { email, username });
    alert("Profile saved (demo)");
  }

  function handlePasswordChange(e) {
    e.preventDefault();
    console.log("[v0] Change password");
    alert("Password change requested (demo)");
  }

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="side-menu-container">
        <SideMenu />
      </aside>

      {/* Main Content */}
      <div className="dashboard-container">
        <div className="dashboard-content">
          <header className="dashboard-header">
            <h1>Profile</h1>
            <p>Manage your account details and password</p>
          </header>

          <div className="grid">
            <section className="card" aria-labelledby="account-title">
              <header className="card-header">
                <h2 id="account-title" className="card-title">
                  Account
                </h2>
              </header>
              <form onSubmit={handleProfileSave}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Save changes</button>
              </form>
            </section>

            <section className="card" aria-labelledby="password-title">
              <header className="card-header">
                <h2 id="password-title" className="card-title">
                  Change Password
                </h2>
              </header>
              <form onSubmit={handlePasswordChange}>
                <div>
                  <label htmlFor="current">Current password</label>
                  <input id="current" type="password" required />
                </div>
                <div>
                  <label htmlFor="new">New password</label>
                  <input id="new" type="password" required />
                </div>
                <div>
                  <label htmlFor="confirm">Confirm new password</label>
                  <input id="confirm" type="password" required />
                </div>
                <button type="submit" className="variant-secondary">
                  Update password
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .dashboard-wrapper {
          display: flex;
          height: 100vh;
          background-color: #f3f4f6;
          font-family: sans-serif;
        }

        .side-menu-container {
          width: 260px;
          border-right: 1px solid #e5e7eb;
          background-color: #f9fafb;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          z-index: 1000;
        }

        .dashboard-container {
          margin-left: 260px; /* Same width as sidebar */
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          height: 100vh;
        }

        .dashboard-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .dashboard-header {
          margin-bottom: 24px;
        }

        .dashboard-header h1 {
          margin: 0 0 4px 0;
          font-size: 2rem;
        }

        .dashboard-header p {
          margin: 0;
          color: #6b7280;
          font-size: 1rem;
        }

        .grid {
          display: grid;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          padding: 24px;
        }
        .card-header {
          margin-bottom: 16px;
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        label {
          font-weight: 600;
          margin-bottom: 4px;
          display: block;
          color: #374151;
        }
        input {
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          outline-offset: 2px;
          transition: border-color 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }
        input:focus {
          border-color: #2563eb;
          outline: none;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.4);
        }
        button {
          padding: 10px 16px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          color: white;
          background-color: #000000;
          width: fit-content;
          align-self: flex-start;
        }
        button:hover {
          background-color: #222222;
          box-shadow: 0 4px 10px rgba(30, 64, 175, 0.4);
        }
        button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.6);
        }
        button.variant-secondary {
            padding: 10px 16px;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            color: white;
            background-color: #000000;
            width: fit-content;
            align-self: flex-start;x
        }
        button.variant-secondary:hover {
          background-color: #222222;
          color: white;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.4);
        }
      `}</style>
    </div>
  );
}
