import React, { Component } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
class ListUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("users")
      .on("value", snapshot => {
        this.setState({
          users: snapshot.val()
        });
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1>User List</h1>
          <table className="table mt-4">
            <thead className="table-info">
              <tr>
                <th scope="col">Account_Id</th>
                <th scope="col">Title</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {this.state.users.map(user =>
                <tr key={user.account}>
                  <td>{user.account}</td>
                  <td>{user.name}</td>
                  <td className="row">
                    <div className="col">
                      <button className="btn btn-danger mr-4">delete</button>
                    </div>

                    <div className="col">
                      <Link to="/edit-user">
                        <button className="btn btn-success">Update</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              )} */}
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
