import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

export default function AuthGuard({ children }) {
  const { userId, loading } = useUser();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="auth-loading-container">
        <div className="auth-loading-spinner"></div>
        <p>Loading...</p>
        <style>{`
          .auth-loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #f9fafb;
          }
          
          .auth-loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #e5e7eb;
            border-top: 3px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .auth-loading-container p {
            color: #6b7280;
            font-size: 1rem;
            margin: 0;
          }
        `}</style>
      </div>
    );
  }

  // Show login required message if no userId
  if (!userId) {
    return (
      <div className="auth-required-container">
        <div className="auth-required-card">
          <div className="auth-required-icon">🔐</div>
          <h1>Authentication Required</h1>
          <p>Please log in to access this page</p>
          <div className="auth-required-buttons">
            <Link to="/login" className="auth-button auth-button-primary">
              Go to Login
            </Link>
            <Link to="/" className="auth-button auth-button-secondary">
              Back to Home
            </Link>
          </div>
        </div>
        
        <style>{`
          .auth-required-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #f9fafb;
            padding: 1rem;
          }
          
          .auth-required-card {
            background: white;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            padding: 3rem 2rem;
            text-align: center;
            max-width: 400px;
            width: 100%;
          }
          
          .auth-required-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
          }
          
          .auth-required-card h1 {
            font-size: 1.75rem;
            font-weight: 700;
            color: #111827;
            margin: 0 0 1rem 0;
          }
          
          .auth-required-card p {
            color: #6b7280;
            font-size: 1rem;
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }
          
          .auth-required-buttons {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .auth-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
            text-decoration: none;
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
          }
          
          .auth-button-primary {
            background-color: #2563eb;
            color: white;
          }
          
          .auth-button-primary:hover {
            background-color: #1d4ed8;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }
          
          .auth-button-secondary {
            background-color: #f3f4f6;
            color: #374151;
            border: 1px solid #d1d5db;
          }
          
          .auth-button-secondary:hover {
            background-color: #e5e7eb;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          
          @media (min-width: 640px) {
            .auth-required-buttons {
              flex-direction: row;
              justify-content: center;
            }
          }
        `}</style>
      </div>
    );
  }

  // User is authenticated, render children
  return children;
}