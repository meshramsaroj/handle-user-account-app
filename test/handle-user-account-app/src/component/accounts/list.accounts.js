import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { Snackbar, IconButton } from "@material-ui/core";

class ListAccounts extends Component {
  constructor(props) {
    super(props);
    this.onDeleteAccount = this.onDeleteAccount.bind(this);
    this.snackBarClose = this.snackBarClose.bind(this);

    this.state = {
      accountsData: [],
      snackBarOpen: false,
      snackBarMsg: ""
    };
  }

  componentDidMount() {
    const accountRef = firebase.database().ref("accounts");
    accountRef.on("value", snapshot => {
      let accounts = snapshot.val();
      let newAccount = [];
      for (let acc in accounts) {
        newAccount.push({
          id: acc,
          appName: accounts[acc].apps.appName,
          title: accounts[acc].apps.title
        });
      }
      this.setState({
        accountsData: newAccount
      });
    });
  }

  snackBarClose() {
    this.setState({
      snackBarOpen: false
    });
  }

  onDeleteAccount(id) {
    firebase
      .database()
      .ref(`accounts/${id}`)
      .remove()
      .then(res => {
        this.setState({
          snackBarOpen: true,
          snackBarMsg: `Deleted Successfully...`
        });
      })
      .catch(err => {
        this.setState({
          snackBarOpen: true,
          snackBarMsg: `failed due to ${err}`
        });
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            open={this.state.snackBarOpen}
            autoHideDuration={2000}
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
          <h1>Accounts List</h1>
          <table className="table mt-4">
            <thead className="table-info">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.accountsData.map(account => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.title}</td>
                  <td className="row">
                    <div className="col">
                      <button
                        className="btn btn-danger mr-4"
                        onClick={this.onDeleteAccount.bind(this, account.id)}
                      >
                        delete
                      </button>
                    </div>

                    <div className="col">
                      <Link to={"/edit-account/" + account.id}>
                        <button className="btn btn-success">Update</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center fixed-bottom">
          <Link to="/create-account">
            <button className="btn  bg-info  rounded-circle">
              <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListAccounts;
