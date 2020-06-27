import React, { Component } from "react";
import "../../css/create.user.css";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { Snackbar, IconButton } from "@material-ui/core";


class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeAccount = this.onChangeAccount.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.snackBarClose = this.snackBarClose.bind(this);

    this.state = {
      account: "",
      name: "",
      accounts: [],
      snackBarOpen: false,
      snackBarMsg: ""
    };
  }

  componentDidMount() {
    this.setState({
      name: ""
    });

    let accountRef = firebase.database().ref("accounts");
    accountRef.on("value", snapshot => {
      let accountData = snapshot.val();
      let newAccount = [];
      for (let acc in accountData) {
        newAccount.push({
          id: acc,
          appName: accountData[acc].apps.appName,
          title: accountData[acc].apps.title
        });
      }
      this.setState({
        accounts: newAccount
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
      .then(() => {
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
    window.location = "/";
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
                  <option key={account.id}>{account.id}</option>
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
