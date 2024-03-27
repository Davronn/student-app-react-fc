import React, { useState } from "react";
import { StudentProvider } from "./components/UserContext";
import ExampleComponent from "./components/StudentList";
import DataContext from "./components/Studentadd";

function App() {
  const [name, setName] = useState("John");
  const [userName, setUserName] = useState("Doe 1222");
  return (
    <StudentProvider value={{ name, userName }}>
      <ExampleComponent />
      <DataContext />
    </StudentProvider>
  );
}

export default App;
