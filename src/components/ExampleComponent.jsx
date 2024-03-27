import React, { useContext } from 'react';
import { StudentContext } from './UserContext';

function ExampleComponent() {
  const { name, userName } = useContext(StudentContext);
  return (
    <>
      <h1>{name}: {userName}</h1>
    </>
  );
}

export default ExampleComponent;

