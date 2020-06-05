import React from "react";
import "../App.css";
import Menu from "../core/Menu";
import { Link } from "react-router-dom";
import { isAutheticated } from "./helper/apicall";

const UserDashboard = ({
  title = "Layour Title",
  description = "layour description",
  className = "",
  children,
  history,
}) => {
  const { name, email } = isAutheticated().user;
  const UserMenu = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-warning text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/user" className="nav-link text-info ">
              Profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/user/history" className="nav-link text-info ">
              Read History
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Menu />
      <div className=" text-dark py-3">
        <div className="container">
          <div className="row mt-4 mb-4">
            <div className="col-md-4">{UserMenu()}</div>
            <div className="col-md-8  bg-white p-4">
              <div className="text-warning">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
