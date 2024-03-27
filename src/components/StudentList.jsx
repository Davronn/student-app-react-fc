import React, { useContext, useEffect, useReducer } from "react";
import { StudentContext } from "./UserContext";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, error: action.payload };
    case "DELETE_STUDENT":
      return {
        ...state,
        data: state.data.filter((student) => student.id !== action.payload),
      };
    default:
      return state;
  }
};

function StudentList() {
  const { name, userName } = useContext(StudentContext);

  const [state, dispatch] = useReducer(reducer, {
    data: [],
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/students");
        dispatch({ type: "SET_DATA", payload: response.data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:3000/students/${studentId}`);
      dispatch({ type: "DELETE_STUDENT", payload: studentId });
    } catch (error) {
      console.error("Error deleting student:", error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="my-3">Students app</h2>
      {state.error && <div>Error: {state.error}</div>}
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Group</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.data.map((student) => (
            <tr key={student.id}>
              <th scope="row">{student.id}</th>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.group}</td>
              <td>
                <button className="btn btn-outline-info mx-1">Edit</button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
