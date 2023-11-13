// AuthContext.tsx
"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

type AuthContextProps = {
  isAuthenticated: boolean;
  token: String;
  loginAuth: (token: string) => void;
  logoutAuth: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check authentication status, e.g., from a token in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (!!token) {
      setToken(token);
    }
  }, []);

  const loginAuth = (token: string) => {
    // Perform login logic, e.g., call your authentication API
    localStorage.setItem("token", token);
    setToken(token);

    setIsAuthenticated(true);
    router.push("/"); // Redirect to home after login
  };

  const logoutAuth = () => {
    // Perform logout logic, e.g., clear the authentication token
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken("");

    router.push("/login"); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, loginAuth, logoutAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
