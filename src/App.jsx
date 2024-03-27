import React, { useState } from "react";
import { StudentProvider } from "./components/UserContext";
import ExampleComponent from "./components/ExampleComponent";
import DataContext from "./components/DataContext";

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
