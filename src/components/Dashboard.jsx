import React, { useState } from "react";
import StudentList from "./StudentList";
import Teachers from "./Teachers";
import "../sass/Dashboard.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(true);

  const toteach = () => {
    setDashboard(false);
  };
  const tostudent = () => {
    navigate("/");
    setDashboard(true);
  };
  const toprofile = () => {
    navigate("/profile");
  }
  return (
    <div>
      <div className="d-flex">
        <div className="dashboard">
          <div className="icons d-flex flex-column align-items-center mt-4">
            <div onClick={toprofile}>
              <AccountCircleIcon className="icon" />
            </div>
            <div className="icon d-flex mt-5 flex-column gap-3">
              <div onClick={tostudent}>
                <GroupIcon />
              </div>
              <div onClick={toteach}>
                <SchoolIcon />
              </div>
            </div>
          </div>
        </div>
        {dashboard ? <StudentList /> : <Teachers />}
      </div>
    </div>
  );
}

export default Dashboard;
