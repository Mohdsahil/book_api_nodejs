import React, { useState, useEffect } from "react";
import Dashboard from "../user/Dashboard";
import { isAutheticated } from "../user/helper/apicall";
import { getcategories, createnewbook } from "./helper/adminmanageapicall";

const CreateBook = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    author: "",
    categories: [],
    category: "",
    language: "",
    pdf: "",
    thumbnail: "",
    createdBook: "",
    loading: false,
    error: "",
    success: false,
    formData: "",
  });

  const {
    name,
    description,
    author,
    categories,
    category,
    language,
    pdf,
    thumbnail,
    createdBook,
    loading,
    error,
    success,
    formData,
  } = values;

  const { user, token } = isAutheticated();

  const loadAllCategory = () => {
    setValues({ ...values, loading: true });
    getcategories().then((data) => {
      console.log(data);
      if (data.error || !data) {
        setValues({ ...values, loading: false, error: data.error });
      } else {
        setValues({
          ...values,
          loading: false,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    loadAllCategory();
  }, []);

  const changeHandler = (name) => (event) => {
    let value;
    if (name === "thumbnail") {
      value = event.target.files[0];
    } else if (name === "pdf") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }

    setValues({ ...values, [name]: event.target.value });
    formData.set(name, value);
  };

  const onSubmmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false, success: false });

    createnewbook(formData, user._id, token).then((data) => {
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
          description: "",
          author: "",
          language: "",
          pdf: "",
          thumbnail: "",
          createdBook: data.name,
          loading: false,
          error: "",
          success: true,
        });
      }
    });
  };

  const errorMessage = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };

  const successMessage = () => {
    return (
      success && (
        <div className="alert alert-success">
          <strong>{createdBook}!</strong> Book Created Successfully
        </div>
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
            Loading...
          </button>
        </div>
      )
    );
  };

  const createBookForm = () => {
    return (
      <form className="mt-4 ">
        <div className="form-group">
          <label>Book thumbnail</label>
          <input
            type="file"
            value={thumbnail}
            placeholder="Choose Thumbnail"
            onChange={changeHandler("thumbnail")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Book Pdf</label>
          <input
            type="file"
            value={pdf}
            placeholder="Choose Pdf"
            onChange={changeHandler("pdf")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Book Name</label>
          <input
            type="text"
            value={name}
            placeholder="Book Name"
            onChange={changeHandler("name")}
            className="form-control"
          />
          <p>book -> {name}</p>
        </div>
        <div className="form-group">
          <label>Book Description</label>
          <textarea
            className="form-control"
            onChange={changeHandler("description")}
            placeholder="Description"
            rows="10"
          >
            {description}
          </textarea>
          <p> {description}</p>
        </div>

        <div className="form-group">
          <label>Author Name</label>
          <input
            type="text"
            value={author}
            placeholder="Author Name"
            onChange={changeHandler("author")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Language</label>
          <input
            type="text"
            value={language}
            placeholder="Language "
            onChange={changeHandler("language")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select onChange={changeHandler("category")} className="form-control">
            <option value="">Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}{" "}
              </option>
            ))}
          </select>
        </div>
        <button onClick={onSubmmit} className="btn btn-info">
          Create
        </button>
      </form>
    );
  };

  return (
    <Dashboard title="Create Book" description="create new book for app.">
      {errorMessage()}
      {successMessage()}
      {loadingMessage()}
      {createBookForm()}
      {/* <p>{JSON.stringify(values)} </p> */}
    </Dashboard>
  );
};

export default CreateBook;
