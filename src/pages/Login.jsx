import React, { useRef } from "react";
import {  useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const name = useRef();
  const password = useRef();
  const submituser = () => {
    if (name.current.value && password.current.value) {
      console.log(name.current.value, password.current.value);
      {
        localStorage.setItem("userName", name.current.value);
        localStorage.setItem("password", password.current.value);
        navigate("/");
      }
    }
  };
  return (
    <div className="container w-25 mt-5 ">
      <h1 className="mb-3">Login</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="text" className="form-control" ref={name} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" ref={password} />
        </div>
      </form>
      <button onClick={submituser} className="btn btn-primary">
        Submit
      </button>
    </div>
  );
}

export default Login;
