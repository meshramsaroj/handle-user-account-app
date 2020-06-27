import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { Snackbar, IconButton } from "@material-ui/core";

export default class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.onUpdate = this.onUpdate.bind(this);
    this.snackBarClose = this.snackBarClose.bind(this);

    this.state = {
      accountId: "",
      appName: "",
      title: "",
      snackBarOpen: false,
      snackBarMsg: ""
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("accounts/" + this.props.match.params.id)
      .on("value", snapshot => {
        let response = snapshot.val();
        this.setState({
          accountId: this.props.match.params.id,
          appName: response.apps.appName,
          title: response.apps.title
        });
      });
  }

  snackBarClose() {
    this.setState({
      snackBarOpen: false
    });
    window.location = "/accounts";
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onUpdate(e) {
    e.preventDefault();
    firebase
      .database()
      .ref(`accounts/${this.state.accountId}`)
      .update({
        "apps/appName": this.state.appName,
        "apps/title": this.state.title
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

  render() {
    return (
      <div className="container w-50 m-auto">
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
        <h1>Edit Account</h1>
        <form className="py-4" onSubmit={this.onUpdate}>
          <div className="form-group ">
            <label>Account_id</label>
            <input
              disabled
              type="text"
              className="form-control"
              placeholder="Enter email"
              value={this.state.accountId}
            />
          </div>
          <div className="form-group">
            <label>App Name</label>
            <input
              disabled
              type="text"
              className="form-control"
              placeholder="Enter email"
              value={this.state.appName}
            />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>

          <div className="mt-5">
            <button className="btn btn-info float-left">Update</button>
            <Link to="/accounts">
              <button className="btn btn-info float-right">Back</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
