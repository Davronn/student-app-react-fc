import React from "react";
import Login from "../pages/Login";
import ToLogin from "./ToLogin";

function Profile() {
  const username = localStorage.getItem("userName");
  console.log(username);
  return <h5>{username ? username : <ToLogin/>}</h5>;
}

export default Profile;
