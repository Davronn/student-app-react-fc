import React from "react";
import { Link } from "react-router-dom";
import '../App.css'

function ProfileInfo() {  
  const name = localStorage.getItem("userName");
  const password = localStorage.getItem("password");
  return (
    <div className="card container w-25 mt-5">
      <h3 className="card-header">Profile</h3>
      <ul className="list-group list-group-flush Tologin">
        <li className="list-group-item">{name ? name : <Link to="/login">Login qil</Link>}</li>
        <li className="list-group-item">{password ? password : <Link to="/login">Login qil</Link>}</li>
      </ul> 
    </div>
  );
}

export default ProfileInfo;
