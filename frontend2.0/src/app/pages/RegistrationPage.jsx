import { useState } from "react";
import { registerUser } from "../../services/api"; // Adjust path if needed
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.email || !form.username || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email.");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password should be at least 6 characters.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await registerUser({
        email: form.email,
        username: form.username,
        password: form.password,
      });

      if (response?.data?.userId) {
        // Save userId in sessionStorage
        sessionStorage.setItem("userId", response.data.userId);
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        throw new Error("Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #f3f4f6;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 1rem;
        }
        .card {
          background-color: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          max-width: 400px;
          width: 100%;
          border: 1px solid #e5e7eb;
        }
        h2 {
          margin: 0 0 0.5rem;
          text-align: center;
          font-size: 1.75rem;
          font-weight: bold;
          color: #111827;
        }
        p.subtitle {
          text-align: center;
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        .form-group {
          margin-bottom: 1rem;
          position: relative;
        }
        label {
          display: block;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
          color: #374151;
        }
        input {
          width: 100%;
          padding: 0.6rem 0.75rem 0.6rem 2.5rem; /* leave space for icon */
          font-size: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
        }
        input:focus {
          border-color: #111827;
        }
        .icon {
          position: absolute;
          top: 65%;
          left: 8px;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }
        .iconMail {
          position: absolute;
          top: 50%;
          left: 8px;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }
        .error {
          color: #dc2626;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        .login-btn {
          width: 100%;
          padding: 0.7rem;
          background-color: #000;
          color: #fff;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 1rem;
        }
        .login-btn:hover {
          background-color: #111;
        }
        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .toggle-link {
          margin-top: 1rem;
          text-align: center;
          font-size: 0.85rem;
          color: #6b7280;
        }
        .toggle-link a {
          color: #111827;
          text-decoration: none;
          font-weight: 600;
          margin-left: 0.25rem;
        }
        .toggle-link a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="container">
        <div className="card">
          <h2>Create an Account</h2>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <span className="iconMail">📧</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <span className="icon">👤</span>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Your username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <span className="icon">🔒</span>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <span className="icon">🔒</span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="toggle-link">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
