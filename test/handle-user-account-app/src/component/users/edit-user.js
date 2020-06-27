import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { Snackbar, IconButton } from "@material-ui/core";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.snackBarClose = this.snackBarClose.bind(this);

    this.state = {
      userId: "",
      accountId: "",
      name: "",
      snackBarOpen: false,
      snackBarMsg: ""
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("users/" + this.props.match.params.id)
      .on("value", snapshot => {
        let response = snapshot.val();
        this.setState({
          userId: this.props.match.params.id,
          accountId: response.account,
          name: response.name
        });
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onUpdate(e) {
    e.preventDefault();
    firebase
      .database()
      .ref(`users/${this.state.userId}`)
      .update({
        account: this.state.accountId,
        name: this.state.name
      })
      .then(() => {
        this.setState({
          snackBarOpen: true,
          snackBarMsg: "Updated Successfully..."
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
      <div className="container w-50 m-auto">
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
        <h1>Edit User</h1>
        <form className="py-4" onSubmit={this.onUpdate}>
          <div className="form-group ">
            <label>User_id</label>
            <input
              disabled
              type="text"
              className="form-control"
              value={this.state.userId}
            />
          </div>
          <div className="form-group">
            <label>Account_id</label>
            <input
              disabled
              type="text"
              className="form-control"
              value={this.state.accountId}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Update Name"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>

          <div className="mt-5">
            <button className="btn btn-info float-left">Update</button>
            <Link to="/">
              <button className="btn btn-info float-right">Back</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default EditUser;
