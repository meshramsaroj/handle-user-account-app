import React, { Component } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { Snackbar, IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.snackBarClose = this.snackBarClose.bind(this);

    this.state = {
      usersData: [],
      snackBarOpen: false,
      snackBarMsg: ""
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("users")
      .on("value", snapshot => {
        let users = snapshot.val();
        let newUser = [];
        for (let user in users) {
          newUser.push({
            id: user,
            account: users[user].account,
            name: users[user].name
          });
        }
        this.setState({
          usersData: newUser
        });
      });
  }

  snackBarClose() {
    this.setState({
      snackBarOpen: false
    });
  }

  onDeleteUser(id) {
    firebase
      .database()
      .ref(`users/${id}`)
      .remove()
      .then(res => {
        this.setState({
          snackBarOpen: true,
          snackBarMsg: "Deleted Successfully..."
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
      <div className="container">
        <div>
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
          <h1>Users List</h1>
          <table className="table mt-4">
            <thead className="table-info">
              <tr>
                <th scope="col">Account_Id</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.usersData.map(user => (
                <tr key={user.id}>
                  <td>{user.account}</td>
                  <td>{user.name}</td>
                  <td>
                    <DeleteIcon onClick={this.onDeleteUser.bind(this, user.id)} />
                    <Link to={"/edit-user/" + user.id}>
                     <EditIcon className="text-dark" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center fixed-bottom">
          <Link to="/create-user">
            <button className="btn  bg-info  rounded-circle">
              <i className="fa fa-plus fa-2x" aria-hidden="true"></i>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListUsers;
