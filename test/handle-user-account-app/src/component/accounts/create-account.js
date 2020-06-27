import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { Snackbar, IconButton } from "@material-ui/core";

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeAppName = this.onChangeAppName.bind(this);
    this.onChangeAppTitle = this.onChangeAppTitle.bind(this);
    this.snackBarClose = this.snackBarClose.bind(this);

    this.state = {
      appName: "",
      title: "",
      accounts: [],
      snackBarOpen: false,
      snackBarMsg: ""
    };
  }

  componentDidMount() {
    this.setState({
      title: "",
      accounts: [
        "psycho",
        "cuckoosnest",
        "addams",
        "princes-bride",
        "mi",
        "bladerunner",
        "nakedgun",
        "scarface",
        "fargo"
      ]
    });
  }

  onChangeAppName(e) {
    this.setState({
      appName: e.target.value
    });
  }

  onChangeAppTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    firebase
      .database()
      .ref("accounts")
      .push({
        apps: {
          appName: this.state.appName,
          title: this.state.title
        }
      })
      .then(data => {
        this.setState({
          snackBarOpen: true,
          snackBarMsg: "Created Successfully..."
        });
      })
      .catch(err => {
        this.setState({
          snackBarOpen: true,
          snackBarMsg: `failed due to ${err}`
        });
      });
  }

  snackBarClose() {
    this.setState({
      snackBarOpen: false
    });
    window.location = "/accounts";
  }

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={3000}
          onClose={this.snackBarClose}
          message={<span>{this.state.snackBarMsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackBarClose}
            >
              <i class="fa fa-times" aria-hidden="true"></i>
            </IconButton>
          ]}
        />
        <h1 className="text-center mb-5">Create New Account</h1>

        <div className=" form w-50 py-4">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>App Name</label>
              <select
                className="form-control"
                ref={this.setTextInputRef}
                value={this.state.appName}
                onChange={this.onChangeAppName}
              >
                {this.state.accounts.map(app => (
                  <option key={app}>{app}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                value={this.state.title}
                onChange={this.onChangeAppTitle}
              />
            </div>
            <div className="form-group mt-5">
              <button type="submit" className="btn btn-info mb-2 float-left">
                Create Account
              </button>
              <Link to="/accounts">
                <button className=" btn btn-info float-right">Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
