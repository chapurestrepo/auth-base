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

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/auth/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data) setUser(data);
      });
  }, []);

  const login = () => {
    window.location.href = "/auth/google";
  };

  const logout = () => {
    fetch("/auth/logout", { credentials: "include" }).then(() => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
