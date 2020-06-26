import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeAppName = this.onChangeAppName.bind(this);
    this.onChangeAppTitle = this.onChangeAppTitle.bind(this);

    this.state = {
      appName: "",
      title: "",
      accounts: []
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
    const account = {
      appName: this.state.appName,
      title: this.state.title
    };

    firebase
      .database()
      .ref("accounts")
      .push({
        apps: {
          appName: this.state.appName,
          title: this.state.title
        }
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));

    this.setState({
      title: ""
    });
    console.log(account);
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center mb-5">Create New Account</h1>

        <div className=" form ">
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
