import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
function ProfileInfo() {
  const name = localStorage.getItem("userName");
  
  return ( 
    <div className="Tologin">
      <Link to="/profile">
        <h5>{name}</h5>
      </Link>
    </div>
  );
}

export default ProfileInfo;
