import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class ListAccounts extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      accountData: []
    };
  }

  componentDidMount() {
    this.getData();
    // console.log(listData);
  }

  getData() {
    var listData = [];
    const ref = firebase.database().ref("accounts");
    ref.on("value", data => {
      listData.push(data.val());
      this.setState({
        accountData: listData
      });
    });

    console.log(this.state.accountData);
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1>Accounts List</h1>
          <table className="table mt-4">
            <thead className="table-info">
              <tr>
                <th scope="col">Account_Id</th>
                <th scope="col">Title</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.accountData.map((account,index) => (
                <tr key={account}>
                  <td>{index}</td>
                  <td>{account[index]}</td>
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
