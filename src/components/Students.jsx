// StudentList.js
import React, { useEffect } from 'react';
import { useStudentContext } from './StudentContext';
import axios from 'axios';

const Students = () => {
  const { state, dispatch } = useStudentContext();

  useEffect(() => {
    axios.get('http://localhost:5000/students')
      .then((response) => {
        dispatch({ type: 'FETCH_STUDENTS', payload: response.data });
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, [dispatch]);

  return (
    <div>
      <h2>Students List</h2>
      <ul>
        {state.students.map((student) => (
          <li key={student.id}>
            {student.firstName} {student.lastName} - {student.group}
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
