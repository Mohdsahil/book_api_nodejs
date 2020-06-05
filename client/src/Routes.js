import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// all the module that have to be render will be here
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";

import AdminRoute from "./auth/AdminRoutes";
import UserRoute from "./auth/UserRoutes";
import AdminDashboard from "./admin/AdminDashboard";
// import UserDashboard from "./user/UserDashboard";
import ManageCategory from "./admin/ManageCategory";
import CreateCategory from "./admin/CreateCategory";
import CreateBook from "./admin/CreateBook";
import ManageBook from "./admin/ManageBook";
import Book from "./core/Book";
import Profile from "./core/Profile";
import Readhistory from "./user/Readhistory";
import Reviews from "./admin/Reviews";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>

        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>

        {/* <UserRoute path="/user/dashboard" exact component={UserDashboard} /> */}
        {/* path that can only be access by user  */}
        {/* <PrivateRoute ></PrivateRoute> */}

        <UserRoute path="/books" exact component={Book} />
        <UserRoute path="/user" exact component={Profile} />
        <UserRoute path="/user/history" exact component={Readhistory} />

        {/* path that can only be access by admin */}
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/category" exact component={ManageCategory} />
        <AdminRoute
          path="/admin/category/create"
          exact
          component={CreateCategory}
        />
        <AdminRoute path="/admin/book/create" exact component={CreateBook} />
        <AdminRoute path="/admin/book" exact component={ManageBook} />
        <AdminRoute path="/admin/book/reviews" exact component={Reviews} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
