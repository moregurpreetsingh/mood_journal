"use client";

import React, { useState, useEffect } from "react";
import SideMenu from "../../components/SideMenu";
import { useUser } from "../../contexts/UserContext";
import { getUserDetails, changePassword } from "../../services/Api";

export default function ProfilePage() {
  const { userId } = useUser();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const userDetails = await getUserDetails(userId);
        setEmail(userDetails.email);
        setUsername(userDetails.username);
      } catch (err) {
        console.error("Failed to load user details", err);
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    }

    if (userId && typeof userId === "string") {
      fetchUser();
    } else {
      console.warn("Invalid or missing userId in context:", userId);
      setError("User not found.");
      setLoading(false);
    }
  }, [userId]);

  async function handleProfileSave(e) {
    e.preventDefault();
    // TODO: Connect to update profile API
    console.log("Saving profile:", { email, username });
    alert("Profile saved (demo)");
  }

  async function handlePasswordChange(e) {
    e.preventDefault();

    try {
      const response = await changePassword({
        userId,
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (response?.userId) {
        alert("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(response?.message || "Password change failed.");
      }
    } catch (err) {
      console.error("Password change error:", err);
      alert(err?.response?.data?.message || "Something went wrong.");
    }
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

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <div className="grid">
              {/* Account Info Form */}
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

              {/* Password Change Form */}
              <section className="card" aria-labelledby="password-title">
                <header className="card-header">
                  <h2 id="password-title" className="card-title">
                    Change Password
                  </h2>
                </header>
                <form onSubmit={handlePasswordChange}>
                  <div>
                    <label htmlFor="current">Current password</label>
                    <input
                      id="current"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="new">New password</label>
                    <input
                      id="new"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm">Confirm new password</label>
                    <input
                      id="confirm"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="variant-secondary">
                    Update password
                  </button>
                </form>
              </section>
            </div>
          )}
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
        }

        .dashboard-container {
          margin-left: 260px;
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
          width: 100%;
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
          background-color: #000;
          color: #fff;
          width: fit-content;
        }

        button:hover {
          background-color: #222;
        }

        button.variant-secondary {
          background-color: transparent;
          border: 2px solid #000;
          color: #000;
        }

        button.variant-secondary:hover {
          background-color: #000;
          color: white;
        }
      `}</style>
    </div>
  );
}
