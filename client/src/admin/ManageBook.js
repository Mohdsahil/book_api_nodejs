import React, { useState, useEffect } from "react";
import Dashboard from "../user/Dashboard";
import { Link } from "react-router-dom";
import { isAutheticated } from "../user/helper/apicall";
import { removebook, getallbook } from "./helper/adminmanageapicall";

const ManageBook = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isdeleted, setIsdeleted] = useState(false);

  const { user, token } = isAutheticated();

  const loadAllBooks = () => {
    setLoading(true);
    getallbook().then((data) => {
      if (data.error) {
        setLoading(false);
        setError({ error: data.error });
      } else {
        setLoading(false);
        setBooks(data);
      }
    });
  };

  useEffect(() => {
    loadAllBooks();
  }, []);

  const errorMessage = () => {
    return error && <div className="alert alert-danger">{error}</div>;
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
            loading...
          </button>
        </div>
      )
    );
  };

  const deleteMessage = () => {
    return (
      isdeleted && (
        <div className="alert alert-success">Book Deleted successfully</div>
      )
    );
  };

  const deleteBook = (bookId) => {
    setLoading(true);
    removebook(user._id, bookId, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setIsdeleted(true);
          loadAllBooks();
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const booksTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Category</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{book.name}</td>
                <td>
                  {" "}
                  <img
                    src={book.thumbnail}
                    alt=""
                    style={{ width: "50px" }}
                  />{" "}
                </td>
                <td>
                  <Link
                    to={`/admin/category/update/${book._id}`}
                    className="btn btn-info"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteBook(book._id)}
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
    <Dashboard title="Create Book" description="create new book for app.">
      {errorMessage()}
      {deleteMessage()}
      {loadingMessage()}
      {booksTable()}
    </Dashboard>
  );
};

export default ManageBook;
