import React from "react";
import UserDashboard from "../user/UserDashboard";
import { isAutheticated } from "../user/helper/apicall";

const Profile = () => {
  const { name, email } = isAutheticated().user;
  return (
    <UserDashboard
      title="Profile"
      description="user section user profile will the here"
    >
      <div className="card mb-4">
        <h4 className="card-header text-warning"> User Info</h4>
        <ul className="list-group">
          {" "}
          <li className="list-group-item">
            {" "}
            <span className="badge badge-success mr-2">Name:</span>
            {name}{" "}
          </li>
          <li className="list-group-item">
            {" "}
            <span className="badge badge-success mr-2">Email:</span>
            {email}{" "}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger mr-2">User Area</span>
          </li>{" "}
        </ul>{" "}
      </div>
    </UserDashboard>
  );
};

export default Profile;
