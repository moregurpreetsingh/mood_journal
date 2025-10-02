import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    setLoading(false); // ✅ Done checking sessionStorage
  }, []);

  const login = (id) => {
    sessionStorage.setItem("userId", id);
    setUserId(id);
  };

  const logout = () => {
    sessionStorage.removeItem("userId");
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
