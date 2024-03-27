import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "./UserContext";
import axios from "axios";

function StudentList() {
  const { name, userName } = useContext(StudentContext);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/students");
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Grop</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student.id}>
              <th scope="row">{student.id}</th>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.group}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
