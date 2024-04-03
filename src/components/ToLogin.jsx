import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function ToLogin() {
  return (
    <div className="Tologin">
      <Link to="/login">
        <p>To Login</p>
      </Link>
    </div>
  );
}

export default ToLogin;
