import React, { useContext, useEffect, useReducer, useState } from "react";
import { StudentContext } from "./UserContext";
import axios from "axios";
import "./StudentList.css";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [editStudent, setEditStudent] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedGroup, setEditedGroup] = useState("");

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

  const open = document.getElementById("modal");
  const openEditModal = (student) => {
    setEditStudent(student);
    setEditedFirstName(student.firstName);
    setEditedLastName(student.lastName);
    setEditedGroup(student.group);
    open.style.display = "block";
  };

  const close = ()=> {
    open.style.display = "none";
  }

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/students/${editStudent.id}`, {
        firstName: editedFirstName,
        lastName: editedLastName,
        group: editedGroup,
      });

      dispatch({
        type: "SET_DATA",
        payload: state.data.map((student) =>
          student.id === editStudent.id
            ? {
                ...student,
                firstName: editedFirstName,
                lastName: editedLastName,
                group: editedGroup,
              }
            : student
        ),
      });

      setEditStudent(null);
    } catch (error) {
      console.error("Error editing student:", error.message);
    }
    finally{
      close();
    }
  };

  const filteredData = state.data.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName} ${student.group}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container">
      <h2 className="my-3">Students app</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by First Name , Last Name and Group"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
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
          {filteredData.map((student, i) => (
            <tr key={student.id}>
              <th scope="row">{i + 1}</th>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.group}</td>
              <td>
                <button
                  className="btn btn-outline-info mx-1"
                  onClick={() => openEditModal(student)}
                >
                  Edit
                </button>
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

      {/* Bootstrap Modal for Edit */}
      <div id="modal" className="modall" tabIndex="-1" role="dialog">
        <div className="modal-dialog container w-50 my-5" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h2 className="modal-title text-white-50">Edit Student</h2>
              <button
                type="button"
                className="close btn btn-danger"
                data-dismiss="modal"
                aria-label="Close"
                onClick={close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <h5 className="text-white" htmlFor="editedFirstName">First Name</h5>
                  <input
                    type="text"
                    className="form-control w-50"
                    id="editedFirstName"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <h5 className="text-white" htmlFor="editedLastName">Last Name</h5>
                  <input
                    type="text"
                    className="form-control w-50"
                    id="editedLastName"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <h5 className="text-white" htmlFor="editedGroup">Group</h5>
                  <input
                    type="text"
                    className="form-control w-25"
                    id="editedGroup"
                    value={editedGroup}
                    onChange={(e) => setEditedGroup(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => close()}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;