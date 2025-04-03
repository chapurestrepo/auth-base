
import { createContext, useState, useEffect, ReactNode } from "react";


interface User {
  _id: string;
  displayName: string;
  email: string;
  profilePhoto: string;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/auth/user`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data) setUser(data);
      });
  }, []);

  const login = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, { credentials: "include" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
