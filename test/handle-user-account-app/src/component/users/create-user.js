import React, { Component } from "react";
import "../../css/create.user.css";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeAccount = this.onChangeAccount.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      account: "",
      name: "",
      accounts: []
    };
  }

  componentDidMount() {
    this.setState({
      name: ""
    });

    firebase
      .database()
      .ref("accounts")
      .on("value", snapshot => {
        const accountData = snapshot.val();
        const keys = Object.keys(accountData);
        this.setState({
          accounts: keys
        });
      });
  }

  onChangeAccount(e) {
    this.setState({
      account: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    firebase
      .database()
      .ref("users")
      .push({
        account: this.state.account,
        name: this.state.name
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));

    this.setState({
      name: ""
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center mb-5">Create New User</h1>

        <div className=" form border border-info">
          <div className="d-flex justify-content-center user">
            <i
              className="fa fa-user-circle fa-4x text-info"
              aria-hidden="true"
            ></i>
          </div>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Select Account</label>
              <select
                className="form-control"
                ref={this.setTextInputRef}
                value={this.state.account}
                onChange={this.onChangeAccount}
              >
                {this.state.accounts.map(account => (
                  <option key={account}>{account}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={this.state.name}
                onChange={this.onChangeName}
              />
            </div>
            <div className="form-group mt-5">
              <button type="submit" className="btn btn-info mb-2 float-left">
                Create User
              </button>
              <Link to="/">
                <button className=" btn btn-info float-right">Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateUser;
