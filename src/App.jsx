import React, { useState } from "react";
import { StudentProvider } from "./components/UserContext";
import ExampleComponent from "./components/StudentList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const [name, setName] = useState("John");
  const [userName, setUserName] = useState("Doe 1222");
  return (
    <StudentProvider value={{ name, userName }}>
      <Router>
        <Routes>
          <Route path="/" element={<ExampleComponent />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </StudentProvider>
  );
}

export default App;
