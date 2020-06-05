import React, { useState, useEffect } from "react";
import Dashboard from "../user/Dashboard";
import { Link } from "react-router-dom";
import { isAutheticated } from "../user/helper/apicall";
import { getcategories, removecategory } from "./helper/adminmanageapicall";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isdeleted, setIsdeleted] = useState(false);

  const { user, token } = isAutheticated();

  const loadAllCategory = () => {
    getcategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    loadAllCategory();
  }, []);

  const deleteCategory = (categoryId) => {
    setLoading(true);
    removecategory(user._id, categoryId, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setIsdeleted(true);
          setLoading(false);
          loadAllCategory();
        }
      })
      .catch((err) => console.log(err));
  };

  const errorMessage = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  const successDeletedMessage = () => {
    return (
      isdeleted && (
        <div className="alert alert-success">Category Deleted Successfully</div>
      )
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-danger">
          <button className="btn btn-danger" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Deleting...
          </button>
        </div>
      )
    );
  };

  const categoryTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            return (
              <tr key={index}>
                <td>sr</td>
                <td>{category.name}</td>
                <td>
                  <Link
                    to={`/admin/category/update/${category._id}`}
                    className="btn btn-info"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="btn btn-danger ml-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <Dashboard
      title="Manage category"
      description="Admin can delete or update the category "
    >
      {errorMessage()}
      {successDeletedMessage()}
      {loadingMessage()}
      {categoryTable()}
    </Dashboard>
  );
};

export default ManageCategory;
