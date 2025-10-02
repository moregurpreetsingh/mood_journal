import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/api";
import { useUser } from "../../contexts/UserContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ Move this to the top level
  const { login } = useUser();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(form);
      console.log(response.data.userId);
      if (response?.data?.userId) {
        login(response.data.userId); // ✅ Call context login function

        navigate("/dashboard");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, sans-serif; background-color: #f3f4f6; }
        .container { display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 1rem; }
        .login-card {
          background-color: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          max-width: 400px;
          width: 100%;
          border: 1px solid #e5e7eb;
        }
        .login-card h2 {
          margin: 0 0 0.5rem;
          text-align: center;
          font-size: 1.75rem;
          font-weight: bold;
          color: #111827;
        }
        .login-card p.subtitle {
          text-align: center;
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        .form-group { margin-bottom: 1rem; }
        label {
          display: block;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
          color: #374151;
        }
        .input-icon-group {
          position: relative;
        }
        .input-icon-group input {
          width: 100%;
          padding: 0.6rem 0.75rem 0.6rem 2.5rem;
          font-size: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
        }
        .input-icon-group input:focus {
          border-color: #111827;
        }
        .input-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 1rem;
        }
        .show-toggle {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 0.8rem;
          color: #6b7280;
          cursor: pointer;
        }
        .helper-text {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.3rem;
        }
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }
        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .row a {
          color: #111827;
          text-decoration: none;
        }
        .row a:hover {
          text-decoration: underline;
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
        .spinner {
          border: 2px solid white;
          border-top: 2px solid black;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          animation: spin 1s linear infinite;
          margin: auto;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .error {
          color: #dc2626;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        .register-link {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.85rem;
          color: #6b7280;
        }
        .register-link a {
          color: #111827;
          text-decoration: none;
          margin-left: 0.25rem;
        }
        .register-link a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="container">
        <div className="login-card">
          <h2>Login</h2>
          <p className="subtitle">Welcome back—track how you feel today.</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-icon-group">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-icon-group">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="show-toggle"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="helper-text">Keep your password secure. Do not share it with anyone.</p>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="row">
              <label className="checkbox-group">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            {/* Submit */}
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? <div className="spinner" /> : "Login"}
            </button>
          </form>

          <p className="register-link">
            Don’t have an account?
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}
