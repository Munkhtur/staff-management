"use client";
import React, { useState } from "react";

import { REQUEST_PASS } from "@/graphql/queries";
import { useMutation } from "@apollo/client";

const ResetPass = () => {
  const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

  const [email, setEmail] = useState("");
  const [requestPass, { data, loading, error }] = useMutation(REQUEST_PASS);

  const handleSubmit = async () => {
    try {
      const { data } = await requestPass({ variables: { email } });
      // Implement your login logic here
      if (data.requestPasswordReset) {
        alert("Link sent to email");
      } else {
        alert("User not found");
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
          Reset Password
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

        <button
          type="button"
          onClick={handleSubmit}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ResetPass;
