"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./components/Provider";
import { AuthProvider } from "./auth";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useRouter, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isForgotPasswordRoute = path?.startsWith("/reset-password");
  return (
    <html lang="en">
      <body className={inter.className + " h-screen"}>
        <Provider>
          <AuthProvider>
            {!isForgotPasswordRoute ? (
              <ProtectedRoute>
                <Navbar />

                {children}
              </ProtectedRoute>
            ) : (
              <>
                <Navbar />
                <div>{children}</div>
              </>
            )}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
