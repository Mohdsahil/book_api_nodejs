import React, { useState, useEffect } from "react";
import Dashboard from "../user/Dashboard";
import { isAutheticated } from "../user/helper/apicall";
import { getallreviews, removereview } from "./helper/adminmanageapicall";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isdeleted, setIsdeleted] = useState(false);

  const { user, token } = isAutheticated();

  const loadAllReviews = () => {
    setLoading(true);
    getallreviews(user._id, token).then((data) => {
      if (data.error) {
        setLoading(false);
        setError({ error: data.error });
      } else {
        setLoading(false);
        setReviews(data);
      }
    });
  };

  useEffect(() => {
    loadAllReviews();
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

  const deleteReview = (reviewId) => {
    setLoading(true);
    removereview(user._id, token, reviewId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setIsdeleted(true);
          setLoading(false);
          loadAllReviews();
        }
      })
      .catch((err) => console.log(err));
  };

  const reviewTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Book</th>
            <th>Author</th>
            <th>User</th>
            <th>Review</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{review.book.name}</td>
                <td>{review.book.author}</td>
                <td>{review.user.name}</td>
                <td>{review.review}</td>
                <td>{review.rating}</td>

                <td>
                  <button
                    onClick={() => deleteReview(review._id)}
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
      title="All review"
      description="Here are all the review from the users"
    >
      {errorMessage()}
      {deleteMessage()}
      {loadingMessage()}
      {reviewTable()}
    </Dashboard>
  );
};

export default Reviews;
