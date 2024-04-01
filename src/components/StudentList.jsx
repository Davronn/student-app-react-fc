import React, { useContext, useEffect, useReducer, useState } from "react";
import { StudentContext } from "./UserContext";
import axios from "axios";
import "./Pagination.css";
import ReactPaginate from "react-paginate";
import UniversalButton from "./StudentListStyled";
import Edit from "./EditStyled";
import Add from "./AddStyled";
import StudentsAdd from "./Studentadd";
import Profile from "./ProfileLinkTo";


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

  const [state, dispatch] = useReducer(reducer, {
    data: [],
    error: null,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [editStudent, setEditStudent] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedGroup, setEditedGroup] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(6);

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

  const close = () => {
    open.style.display = "none";
  };

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
    } finally {
      close();
    }
  };

  const pageCount = Math.ceil(state.data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const filteredData = state.data
    .filter((student) => {
      const fullName = `${student.firstName} ${student.lastName} ${student.group}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="my-3">Students app</h2>
        <div className="">
          <Profile />
        </div>
      </div>
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
              <th scope="row">{offset + i + 1}</th>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.group}</td>
              <td>
                <UniversalButton
                  className="mx-1"
                  onClick={() => openEditModal(student)}
                >
                  Edit
                </UniversalButton>
                <UniversalButton
                  variant="delete"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </UniversalButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />

      <div className="container">
        <StudentsAdd />
      </div>
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
                  <h5 className="text-white" htmlFor="editedFirstName">
                    First Name
                  </h5>
                  <input
                    type="text"
                    className="form-control w-50"
                    id="editedFirstName"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <h5 className="text-white" htmlFor="editedLastName">
                    Last Name
                  </h5>
                  <input
                    type="text"
                    className="form-control w-50"
                    id="editedLastName"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <h5 className="text-white" htmlFor="editedGroup">
                    Group
                  </h5>
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
              <Edit
                type="button"
                variant="cancle"
                data-dismiss="modal"
                className="mx-1"
                onClick={() => close()}
              >
                Close
              </Edit>
              <Edit type="button" onClick={handleEdit}>
                Save changes
              </Edit>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
