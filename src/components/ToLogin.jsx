import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function ToLogin() {
  return (
    <div className="Tologin">
      <Link to="/login">
        <h5>To Login</h5>
      </Link>
    </div>
  );
}

export default ToLogin;
