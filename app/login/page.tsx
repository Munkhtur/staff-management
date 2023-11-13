// pages/LoginPage.tsx
"use client";
import { useState, useEffect } from "react";
import { LOGIN_USER } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useAuth } from "../auth";

const LoginPage: React.FC = () => {
  const { loginAuth } = useAuth();
  const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      // Implement your login logic here
      if (data.login != null) {
        loginAuth(data.login.token);
      } else {
        alert("Email or password wrong");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="w-1/2 lg:w-1/3 m-auto">
      <div className="mb-10">
        <div className="flex justify-center"></div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Login
        </h2>
        <p className="text-center text-sm text-gray-600 mt-5">
          {"Don't have an account yet? "}{" "}
          <Link
            href={"/register"}
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            {"Register"}
          </Link>
        </p>
      </div>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fixedInputClass}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fixedInputClass}
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600 mt-5">
          {"Forgot password? "}{" "}
          <Link
            href={"/forgot-password"}
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            {"Reset Password"}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
