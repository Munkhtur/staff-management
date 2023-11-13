// pages/LoginPage.tsx
"use client";
import { useState, useEffect } from "react";
import { RESET_PASS } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
// import { useAuth } from "../auth";

const ResetPassword: React.FC = () => {
  // const { loginAuth } = useAuth();
  const params = useParams();
  const router = useRouter();

  const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
  const [password, setPassword] = useState("987654");
  const [confirmPassword, setConfirmPassword] = useState("987654");
  const [resetPass, { data, loading, error }] = useMutation(RESET_PASS);
  const token = params!.token;
  console.log(token);
  const handleSubmit = async () => {
    if (confirmPassword != password) {
      alert("Password doesn't match");
    } else {
      try {
        const { data } = await resetPass({
          variables: { token, newPassword: password },
        });
        if (data.resetPassword) {
          router.push("login");
        } else {
          alert("something went wrong");
        }
      } catch (error) {
        alert(error);
      }
    }
    // Implement your login logic here
    // if (data.login != null) {
    //   loginAuth(data.login.token);
    // } else {
    //   alert("Email or password wrong");
    // }
  };

  return (
    <div className="w-1/2 lg:w-1/3 m-auto">
      <div className="mb-10">
        <div className="flex justify-center"></div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Reset Password
        </h2>
      </div>
      <form>
        <div>
          <label>New Password:</label>
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
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
