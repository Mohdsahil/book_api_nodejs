import React, { useState } from "react";
import Layout from "../core/Layout";

import { signup } from "./helper/apicall";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
    error: "",
    success: false,
  });
  const { name, email, password, error, success, loading } = values;
  const changeHandler = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          setValues({
            name: "",
            email: "",
            password: "",
            loading: false,
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        </div>
      )
    );
  };
  const errorMessage = () => {
    return error && <div className="alert alert-info">{error}</div>;
  };
  const successMessage = () => {
    return (
      success && <div className="alert alert-info">Register Successfully</div>
    );
  };

  const SignUpForm = () => {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            name=""
            value={name}
            onChange={changeHandler("name")}
            className="form-control"
            placeholder="Full Name"
            id=""
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            onChange={changeHandler("email")}
            value={email}
            name=""
            className="form-control"
            placeholder="Email"
            id=""
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            onChange={changeHandler("password")}
            value={password}
            name=""
            className="form-control"
            placeholder="Password"
            id=""
          />
        </div>
        <button onClick={onSubmmit} className="btn btn-primary ">
          SingUp
        </button>
      </form>
    );
  };

  return (
    <Layout
      title="Sign Up"
      description="Please register here to user this application"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 mr-auto ml-auto">
            {loadingMessage()}
            {errorMessage()}
            {successMessage()}
            {SignUpForm()}
            {/* <p>{JSON.stringify(values)}</p> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
