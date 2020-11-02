import React, { Component } from "react";
import UserService from "../Services/user.service";
import User from './UserComponent';


export default class BoardAdminComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: [],
      isLoadig: true
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          Users: response.data,
          isLoadig: false
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  reloadpage = () => {
    this.setState({ isLoadig: true }, () => {
      UserService.getAdminBoard().then(
        response => {
          this.setState({
            Users: response.data,
            isLoadig: false
          });
        },
        error => {
          this.setState({
            content:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        }
      );
    })
  }

  render() {

    return (
      <div className="container">
        <h3>  &#xf2ba; Manage Users</h3>
        {this.state.isLoadig ? <div className="loading"></div> :
          <>
            {this.state.Users.map((user) => {
              return <User key={user.user_id} myUser={user} reloadpage={this.reloadpage}></User>
            })}
          </>
        }
      </div>
    );
  }
}
