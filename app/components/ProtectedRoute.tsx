// ProtectedRoute.tsx

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
