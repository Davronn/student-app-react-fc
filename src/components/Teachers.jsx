import React, { useEffect, useState } from "react";
import Profile from "./ProfileLinkTo";
import axios from "axios";
import UniversalButton from "./StudentListStyled";
import ReactPaginate from "react-paginate";
import "../App.css";
import Edit from "./EditStyled";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [teachersPerPage] = useState(5);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedGroup, setEditedGroup] = useState("");
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.firstName} ${teacher.lastName} ${teacher.group}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredTeachers.length / teachersPerPage);
  const offset = currentPage * teachersPerPage;

  const currentTeachers = filteredTeachers.slice(
    offset,
    offset + teachersPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const openEditModal = (student) => {
    setEditStudent(student);
    setEditedFirstName(student.firstName);
    setEditedLastName(student.lastName);
    setEditedGroup(student.group);
    console.log("Editing teacher:", teachers);
    open.style.display = "block";
  };

  const close = () => {
    open.style.display = "none";
  };

  const handleDelete = async (teacherId) => {
    try {
      await axios.delete(`http://localhost:3000/teachers/${teacherId}`);
      setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
      console.log("Teacher deleted successfully");
    } catch (error) {
      console.error("Error deleting teacher:", error.message);
    }
  };
  const open = document.getElementById("modal");
  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/teachers/${editStudent.id}`, {
        firstName: editedFirstName,
        lastName: editedLastName,
        group: editedGroup,
      });
  
      setTeachers(teachers.map((teacher) =>
        teacher.id === editStudent.id ? { ...teacher, firstName: editedFirstName, lastName: editedLastName, group: editedGroup } : teacher
      ));
      
      setEditStudent(null); // Clear editStudent state
      close(); // Close modal after editing
    } catch (error) {
      console.error("Error editing teacher:", error.message);
    }
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center p-2">
        <h2 className="my-3">Teachers app</h2>
        <div className="">
          <Profile />
        </div>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by First Name, Last Name, and Group"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
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
          {currentTeachers.map((teacher, index) => (
            <tr key={teacher.id}>
              <th scope="row">{offset + index + 1}</th>
              <td>{teacher.firstName}</td>
              <td>{teacher.lastName}</td>
              <td>{teacher.group}</td>
              <td>
                <UniversalButton
                  className="mx-1"
                  onClick={() => openEditModal(teacher)}
                >
                  Edit
                </UniversalButton>
                <UniversalButton
                  variant="delete"
                  onClick={() => handleDelete(teacher.id)}
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
        pageRangeDisplayed={6}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
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

export default Teachers;
