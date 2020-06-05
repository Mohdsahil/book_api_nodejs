import React from "react";
import Dashboard from "../user/Dashboard";
import { isAutheticated } from "../user/helper/apicall";

const AdminDashboard = () => {
  const { name, email } = isAutheticated().user;
  return (
    <Dashboard
      title="Admin Dashboard"
      description="user section user profile will the here"
    >
      <div className="card mb-4">
        <h4 className="card-header text-warning"> Admin Info</h4>
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
            <span className="badge badge-danger mr-2">Admin Area</span>
          </li>{" "}
        </ul>{" "}
      </div>
    </Dashboard>
  );
};

export default AdminDashboard;
