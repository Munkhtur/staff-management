import React from "react";
import { User } from "../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserTable: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Email
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Role
            </th>

            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 text-right"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {users.map((user) => {
            return (
              <tr key={user.id as string} className="hover:bg-gray-50">
                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative ">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-400">{user.email}</div>
                  </div>
                </td>
                <td className="font-medium text-gray-700">{user.name}</td>

                <td className="px-6 py-4">{user.role}</td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <Link
                      x-data="{ tooltip: 'Edite' }"
                      href={`/user/${user.id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
