import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");

  const name1 = (e) => {
    e.preventDefault();
    setname(e.target.value.trim());
  };

  const password1 = (e) => {
    e.preventDefault();
    setPassword(e.target.value.trim());
  };
  console.log(name, password);
  const submituser = () => {
    if (name.length > 2 && password.length > 2) {
      {
        localStorage.setItem("userName", name);
        localStorage.setItem("password", password);
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
          <input type="text" className="form-control" onChange={name1} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={password1}
          />
        </div>
      </form>
      <button onClick={submituser} className="btn btn-primary">
        Submit
      </button>
    </div>
  );
}

export default Login;
