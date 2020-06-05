import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getallbook } from "../admin/helper/adminmanageapicall";
import DialogBox from "./DialogBox";

const Book = () => {
  const [books, setBooks] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
    return loading && <div className="alert alert-warning">loading....</div>;
  };

  const showbooks = () => {
    return (
      <div className="row text-left">
        {books.map((book, index) => (
          <div key={index} className="col-md-4">
            <div className="card border border-warning p-3">
              <img src={book.thumbnail} alt="" className="card-img-top" />
              <div className="card-body border bg-warning border-warning p-2 mt-2">
                <h5 className="card-title">{book.name}</h5>

                <small className="text-light">{book.author} </small>
                <br />
                <p className="card-text"> {book.description} </p>

                <DialogBox book={book} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout
      title="Books"
      description="Books that you can read and explore more"
    >
      <div className="container my-3">
        {errorMessage()}
        {loadingMessage()}

        {showbooks()}
      </div>
    </Layout>
  );
};

export default Book;
