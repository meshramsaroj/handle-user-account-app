import React from "react";
import "./App.css";
import Navbar from "./component/navbar-component";

import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateUser from "./component/users/create-user";
import ListUsers from "./component/users/list-users";
import EditUser from "./component/users/edit-user";
import ListAccounts from "./component/accounts/list.accounts";
import CreateAccount from "./component/accounts/create-account";
import EditAccount from "./component/accounts/edit.account";

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Navbar />
        <Route path="/" exact component={ListUsers} />
        <Route path="/accounts" component={ListAccounts} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/create-user" component={CreateUser} />
        <Route path="/edit-user/:id" component={EditUser} />
        <Route path="/edit-account/:id" component={EditAccount} />
      </Router>
    </div>
  );
}

export default App;
