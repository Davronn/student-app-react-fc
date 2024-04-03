import React, { useEffect } from "react";
import Login from "../pages/Login";
import ToLogin from "./ToLogin";
import ProfileInfo from "./ProfileLink";

function Profile() {
  const username = localStorage.getItem("userName");
  
  console.log(username);
  return <div>{username ? "" : <ToLogin />}</div>;
}

export default Profile;
