import React, { useEffect, useState } from "react";
import Profile from "./ProfileLinkTo";
import axios from "axios";
import UniversalButton from "./StudentListStyled";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
  };

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.firstName} ${teacher.lastName} ${teacher.group}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const openEditModal = (teacher) => {
    console.log("Editing teacher:", teacher);
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
          {filteredTeachers.map((teacher, index) => (
            <tr key={teacher.id}>
              <th scope="row">{index + 1}</th>
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
    </div>
  );
}

export default Teachers;
