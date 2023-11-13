// pages/LoginPage.tsx
"use client";
import { useState, useEffect } from "react";
import { REGISTER_USER } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useAuth } from "../auth";

const LoginPage: React.FC = () => {
  const { loginAuth } = useAuth();

  const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Staff");
  const [register, { data, loading, error }] = useMutation(REGISTER_USER);

  const handleSubmit = async () => {
    try {
      const { data } = await register({ variables: { email, password, role } });
      // Implement your login logic here
      console.log(data.register.token, "reg");
      if (data.register != null) {
        loginAuth(data.register.token);
      }
    } catch (error) {
      alert(error);
    }
    // Add logic to validate credentials and navigate to the next page on successful login
  };

  return (
    <div className="w-1/2 lg:w-1/3 m-auto">
      <div className="mb-10">
        <div className="flex justify-center"></div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Register
        </h2>
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
          <label>Role:</label>
          <select
            className={fixedInputClass}
            onChange={(e) => {
              setRole(e.target.value);
            }}
            defaultValue={"Staff"}
          >
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
          </select>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={fixedInputClass}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
