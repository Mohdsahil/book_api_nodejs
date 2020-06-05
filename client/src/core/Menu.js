import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAutheticated, signout } from "../user/helper/apicall";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ffffff" };
  } else {
    return { color: "#000000" };
  }
};

const Menu = ({ history }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
      <Link className="navbar-brand" to="/">
        Book App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" style={currentTab(history, "/")} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/books"
              style={currentTab(history, "/books")}
              className="nav-link"
            >
              Books
            </Link>
          </li>
          {isAutheticated() && isAutheticated().user.role === 0 && (
            <li>
              <Link
                to="/user"
                style={currentTab(history, "/user")}
                className="nav-link"
              >
                U Dashboard
              </Link>
            </li>
          )}
          {isAutheticated() && isAutheticated().user.role === 1 && (
            <li>
              <Link
                to="/admin/dashboard"
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
              >
                A Dashboard
              </Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ml-auto">
          {isAutheticated() && (
            <li>
              <button
                className="btn outline-danger"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </button>
            </li>
          )}
          {!isAutheticated() && (
            <Fragment>
              <li>
                <Link
                  to="/signin"
                  style={currentTab(history, "/singin")}
                  className="nav-link"
                >
                  <button className="btn btn-outline-success">Signin</button>
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  style={currentTab(history, "/singup")}
                  className="nav-link"
                >
                  <button className="btn btn-outline-success">Signup</button>
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Menu);
