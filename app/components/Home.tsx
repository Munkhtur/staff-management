import React, { useEffect } from "react";
import UserList from "./UserList";
import { parseJwt } from "../utils/parseJwt";
const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken: any = parseJwt(token!);
  }, []);
  return (
    <div className="">
      <UserList />
    </div>
  );
};

export default Home;
