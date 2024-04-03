import React, { useEffect, useState } from "react";
import Profile from "./ProfileLinkTo";
import axios from "axios";
import UniversalButton from "./StudentListStyled";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  console.log(teachers);
  useEffect(() => {
    const fetchTeahcer = async () => {
      try {
        const response = await axios.get("http://localhost:3000/teachers");
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchTeahcer();
  }, []);


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
          placeholder="Search by First Name , Last Name and Group"
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
          {teachers.map((student, i) => (
            <tr key={student.id}>
              <th scope="row">{i + 1}</th>
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
    </div>
  );
}

export default Teachers;
