import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./loading.css"
import AuthService from "./Services/auth.service";
import Login from "./Components/LoginComponent";
import Register from "./Components/RegisterComponent";
import WelcomeComponent from "./Components/WelcomeComponent";
import Profile from "./Components/ProfileComponent";
import BoardUser from "./Components/BoardUserComponent";
import SaleForm from './Components/SaleForm'
import Edituser from './Components/EditUserComponent'
import BoardAdmin from "./Components/BoardAdminComponent";
import HomeComponent from "./Components/HomeComponent";
import MessagePage from "./Components/MessagePageComponent";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  setUser = (user) => {

    this.setState({
      currentUser: user,
      showAdminBoard: user.roles.includes("ROLE_ADMIN")
    });
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div className="maincontainer ">
        <Router>

          <div className=" container insidecontainer">
            <nav className="navbar navbar-expand mynavbar  ">
              <Link to={"/"}  id="brand"className="navbar-brand">
              Online Thrift Store
            </Link>
              <div className="navbar-nav mr-auto">
                {currentUser && (
                  <>
                  <li className="nav-item homelink">
                    <Link to={"/home"} className="nav-link">
                      &#xf015; Store
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link" id="profilelink">
                      &#xf007; {currentUser.username}'s profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/messagepage"} className="nav-link" id="profilelink">
                    &#xf0e0; Check Your Messages
                    </Link>
                  </li>
                  </>
                 
                  
                )}


                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link manageuserlink">
                    &#xf2ba; Manage Users
                  </Link>
                  </li>
                )}


              </div>

              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item saleitem" >
                    <Link to={"/saleform"} className="nav-link">
                      &#xf055; Sale Now!!
                    </Link>
                  </li>
               

                  <li className="nav-item">
                    <a href="/" className="nav-link logoutlink" onClick={this.logOut}>
                      Log-Out   &#xf08b;
                  </a>
                  </li>
                </div>
              ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item loginbutton">
                      <Link to={"/login"} className="nav-link">
                        &#xf090; Login
                  </Link>
                    </li>

                    <li className="nav-item ">
                      <Link  id="signinbtn" to={"/register"} className="nav-link">
                        Register
                  </Link>
                    </li>
                  </div>
                )}

            </nav>

            <div className="container-fluid  ">
              <Switch>
                <Route exact path="/" component={WelcomeComponent} />

                <Route exact path="/edituser" render={props => (
                  <Edituser {...props} myUser={this.state.currentUser} />
                )} />

                <Route exact path="/home" component={HomeComponent} />

                <Route exact path="/login" render={props => (
                  <Login {...props} setuser={this.setUser} />
                )} />

                <Route exact path="/register" render={props => (
                  <Register {...props} />
                )} />

                <Route exact path="/profile" render={props => (
                  <Profile {...props} setuser={this.setUser} />
                )} />

                  <Route exact path="/messagepage" render={props => (
                  <MessagePage {...props} />
                )} />

                <Route path="/user" component={BoardUser} />

                <Route path="/admin" component={BoardAdmin} />

                <Route exact path="/saleform" render={props => (
                  <SaleForm {...props} currentuser={this.state.currentUser} />
                )} />

              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}


export default App;