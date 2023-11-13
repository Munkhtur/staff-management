"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER, GET_USER_BY_ID } from "@/graphql/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faP, faPen } from "@fortawesome/free-solid-svg-icons";
import { TuiDatePicker } from "nextjs-tui-date-picker";
import { stringify } from "querystring";

const page = () => {
  const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
  const [isEdit, setIsEdit] = useState(false);
  const [vals, setVals] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "male",
    role: "Staff",
  });

  const router = useRouter();
  const params = useParams();
  const userId = Array.isArray(params!.id) ? params!.id[0] : params!.id;
  const id = parseInt(userId, 10);

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: id },
    // nextFetchPolicy: [{ query: GET_NOVEL, variables: { id } }],
  });
  const [updateUser] = useMutation(UPDATE_USER, {
    variables: { id: id, input: { ...vals } },
  });

  useEffect(() => {
    if (data && data.user) {
      const { __typename, id, ...fields } = data.user;
      const dateOfBirthString = fields.dateOfBirth
        ? new Date(Number(fields.dateOfBirth)).toLocaleDateString()
        : "";
      setVals((prevVals) => ({
        ...prevVals,
        ...fields,
        dateOfBirth: dateOfBirthString,
      }));
    }
  }, [data]);
  if (loading)
    return (
      <p className="text-white flex items-center justify-center">
        Loading ....
      </p>
    );

  if (error)
    return (
      <p className="text-white flex items-center justify-center">
        Oops! Something went wrong ....
      </p>
    );
  const user = data!.user;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (vals.email === "") return alert("Please enter email name");
    const dateOfBirth = new Date(vals.dateOfBirth);
    updateUser({
      variables: { id: parseInt(userId, 10), input: { ...vals, dateOfBirth } },
    });
    setIsEdit(false);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col justify-center align-middle  w-1/2  m-auto gap-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-6xl">Account</h1>
            <h3>Manage your accounts</h3>
          </div>
          {!isEdit && (
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 bg-teal-50 rounded-full text-gray-500 cursor-pointer"
              onClick={() => setIsEdit(true)}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          )}
        </div>
        <div>
          <h2>Profile</h2>
          <hr />
          <div className="flex items-center mt-5 ">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-5">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>

            <div className="">
              {" "}
              {isEdit ? (
                <input
                  className={fixedInputClass}
                  type="text"
                  placeholder="name"
                  value={vals.name || ""}
                  onChange={(e) => setVals({ ...vals, name: e.target.value })}
                />
              ) : (
                <span>{vals.name}</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <h2>Info</h2>
          <hr />
          <div className="flex flex-col gap-5 mt-5">
            Email:{" "}
            {isEdit ? (
              <input
                className={fixedInputClass}
                type="text"
                value={vals.email || ""}
                onChange={(e) => setVals({ ...vals, email: e.target.value })}
              />
            ) : (
              <span>{vals.email}</span>
            )}
            <div>
              Address:{" "}
              {isEdit ? (
                <input
                  className={fixedInputClass}
                  type="text"
                  value={vals.address || ""}
                  onChange={(e) =>
                    setVals({ ...vals, address: e.target.value })
                  }
                />
              ) : (
                <span>{vals.address}</span>
              )}
            </div>
            <div>
              Phone number:{" "}
              {isEdit ? (
                <input
                  className={fixedInputClass}
                  type="text"
                  value={vals.phone || ""}
                  onChange={(e) => setVals({ ...vals, phone: e.target.value })}
                />
              ) : (
                <span>{vals.phone}</span>
              )}
            </div>
            <div>
              Role:{" "}
              {isEdit ? (
                <select
                  className={fixedInputClass}
                  onChange={(e) => setVals({ ...vals, role: e.target.value })}
                  value={vals.role || ""}
                >
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
              ) : (
                <span>{vals.role}</span>
              )}
            </div>
            <div>
              Data of birth:{" "}
              {isEdit ? (
                <input
                  type="date"
                  onChange={(e) =>
                    setVals({ ...vals, dateOfBirth: e.target.value })
                  }
                  value={vals.dateOfBirth}
                />
              ) : (
                <span>{vals.dateOfBirth}</span>
              )}
            </div>
            <div>
              Gender:{" "}
              {isEdit ? (
                <select
                  className={fixedInputClass}
                  onChange={(e) => setVals({ ...vals, gender: e.target.value })}
                  value={vals.gender || ""}
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              ) : (
                <span>{vals.gender}</span>
              )}
            </div>
          </div>
        </div>
        <div>
          {isEdit ? (
            <button
              className=" h-10 rounded-md  md px-6 font-medium text-white bg-purple-600 hover:bg-purple-700  transition-all duration-300"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Save Changes
            </button>
          ) : (
            <button className=" px-6 font-medium bg-red-700 text-white h-10 rounded-md  md hover:bg-red-400 transition-all duration-300">
              Delete Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
