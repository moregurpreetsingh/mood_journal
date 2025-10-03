"use client";

import React, { useState, useEffect } from "react";
import SideMenu from "../../components/SideMenu";
import { useUser } from "../../contexts/UserContext";
import { getUserDetails, changePassword, changeUserName } from "../../services/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../ProfilePage.css";

export default function ProfilePage() {
  const { userId } = useUser();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUserDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getUserDetails({ userId });
        const user = response.data;
        setEmail(user.email);
        setUsername(user.userName); // Note: match backend field
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!username || username.trim().length < 2) {
      toast.error("Username must be at least 2 characters long");
      return;
    }
    
    setUsernameLoading(true);
    
    try {
      await changeUserName({
        userId,
        userName: username.trim(),
      });
      
      toast.success("Username updated successfully!");
    } catch (err) {
      const msg =
        err.response?.data || err.message || "An error occurred while updating username";
      toast.error(msg);
      console.error("Username update failed:", msg);
    } finally {
      setUsernameLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const currentPassword = e.target.current.value;
    const newPassword = e.target.new.value;
    const confirmPassword = e.target.confirm.value;

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    try {
      await changePassword({
        userId,
        password: currentPassword,
        newPass: newPassword,
        confirmPass: confirmPassword,
      });

      toast.success("Password changed successfully");
      e.target.reset();
    } catch (err) {
      const msg =
        err.response?.data || err.message || "An error occurred while changing password";
      toast.error(msg);
      console.error("Password change failed:", msg);
    }
  };

  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="side-menu-container">
          <SideMenu />
        </aside>

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
                        readOnly
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
                    <button type="submit" disabled={usernameLoading}>
                      {usernameLoading ? "Saving..." : "Save changes"}
                    </button>
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
            )}
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick />
    </>
  );
}
