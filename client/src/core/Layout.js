import React from "react";
import "../App.css";
import Menu from "./Menu";
const Layout = ({
  title = "Layour Title",
  description = "layour description",
  className = "",
  children,
  history,
}) => {
  return (
    <div className="">
      <Menu />
      <div className=" text-dark text-center py-3">
        <h1>{title}</h1>
        <p>{description}</p>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
