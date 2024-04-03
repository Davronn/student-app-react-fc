import React, { useState } from "react";
import { StudentProvider } from "./components/UserContext";
import ExampleComponent from "./components/StudentList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProfileInfo from "./pages/ProfileInfo";
import Dashboard from "./components/Dashboard";

function App() {
  const [name, setName] = useState("John");
  const [userName, setUserName] = useState("Doe 1222");
  return (
    <StudentProvider value={{ name, userName }}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileInfo />} />
        </Routes>
      </Router>
    </StudentProvider>
  );
}

export default App;
