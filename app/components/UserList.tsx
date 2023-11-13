import React from "react";
import { GET_USERS } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { User } from "../utils/types";
import UserTable from "./UserTable";

const UserList = () => {
  const { data, loading, error } = useQuery(GET_USERS);
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

  const users = data!["users"];
  return (
    <div className="m-10">
      <h1 className="text-xl ml-5">Staff List</h1>
      <UserTable users={users} />
    </div>
  );
};

export default UserList;
