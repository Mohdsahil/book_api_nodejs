import React, { useState } from "react";
import Dashboard from "../user/Dashboard";
import { isAutheticated } from "../user/helper/apicall";
import { createcategory } from "./helper/adminmanageapicall";

const CreateCategory = () => {
  const [values, setValues] = useState({
    name: "",
    loading: false,
    error: "",
    success: false,
  });

  const { name, loading, error, success } = values;
  const { user, token } = isAutheticated();

  const changeHandler = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false, success: false });

    createcategory(values, user._id, token)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            loading: false,
            success: true,
            error: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const errorMessage = () => {
    return (
      error && <div className="alert alert-danger">{JSON.stringify(error)}</div>
    );
  };

  const successMessage = () => {
    return (
      success && (
        <div className="alert alert-success">Category Created Successfully</div>
      )
    );
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
            Creating...
          </button>
        </div>
      )
    );
  };

  const createCategoryForm = () => {
    return (
      <form className="mt-4 ">
        <div className="form-group">
          <input
            type="text"
            value={name}
            placeholder="Eg. Story  Book"
            onChange={changeHandler("name")}
            className="form-control"
          />
        </div>
        <button onClick={onSubmmit} className="btn btn-info">
          Create
        </button>
      </form>
    );
  };

  return (
    <Dashboard>
      {loadingMessage()}
      {errorMessage()}
      {successMessage()}
      {createCategoryForm()}
    </Dashboard>
  );
};

export default CreateCategory;
