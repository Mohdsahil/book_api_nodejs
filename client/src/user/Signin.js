import React, { useState } from "react";
import Layout from "../core/Layout";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "./helper/apicall";

const Signin = () => {
  let [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    error: "",
    success: false,
    didRedirect: false,
  });
  const { email, password, error, success, loading, didRedirect } = values;
  const changeHandler = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const { user } = isAutheticated();
  const onSubmmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didredirect: true,
              success: true,
              error: false,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
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
      success && <div className="alert alert-info">Login Successfully</div>
    );
  };

  const SignInForm = () => {
    return (
      <form>
        <div className="form-group"></div>
        <div className="form-group">
          <input
            type="email"
            onChange={changeHandler("email")}
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
            name=""
            className="form-control"
            placeholder="Password"
            id=""
          />
        </div>
        <button onClick={onSubmmit} className="btn btn-primary ">
          SingIn
        </button>
      </form>
    );
  };

  return (
    <Layout title="Sign In" description="Please Signin to procede">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mr-auto ml-auto">
            {loadingMessage()}
            {errorMessage()}
            {successMessage()}
            {performRedirect()}
            {SignInForm()}
            {/* <p>{JSON.stringify(values)}</p> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
