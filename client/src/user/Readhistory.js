import React, { useState, useEffect } from "react";
import UserDashboard from "../user/UserDashboard";
import { isAutheticated } from "../user/helper/apicall";
import { readhistory } from "./helper/apicall";
import DialogBox from "../core/DialogBox";

const Readhistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, token } = isAutheticated();

  const loadAllBooks = () => {
    setLoading(true);
    readhistory(user._id, token).then((data) => {
      if (data.error) {
        setLoading(false);
        setError({ error: data.error });
      } else {
        setLoading(false);
        setHistory(data);
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
        {history.map((his, index) => (
          <div key={index} className="col-md-4">
            <div className="card border border-warning p-3">
              <img src={his.thumbnail} alt="" className="card-img-top" />
              <div className="card-body border bg-warning border-warning p-2 mt-2">
                <h5 className="card-title">{his.name}</h5>

                <small className="text-light">{his.author} </small>
                <br />

                <DialogBox book={his} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <UserDashboard
      title=" Readed History"
      description="Here is your readed history"
    >
      {errorMessage()}
      {loadingMessage()}
      {showbooks()}
    </UserDashboard>
  );
};

export default Readhistory;
