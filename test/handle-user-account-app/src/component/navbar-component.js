import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-info text-light border-bottom box-shadow">
          <h4 className="my-0 mr-md-auto font-weight-normal">My App</h4>
          <nav className="my-2 my-md-0 mr-md-3">
            <Link className="p-2 text-light" to="/">
              Users
            </Link>
            <Link className="p-2 text-light" to="/accounts">
              Accounts
            </Link>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;
