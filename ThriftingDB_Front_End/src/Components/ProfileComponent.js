import React, { Component } from "react";
import AuthService from "../Services/auth.service";
import Axios from "axios";
import Sale from './Sale'
import "../profile.css"
import authHeader from "../Services/auth-header"


const myurl = "http://localhost:8080/images/"


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      myUser: {},
      userSales: [],
      isLoadig: false,
      dummy: "",
      currentUserPosition:{
        
      }
    }
  }



  componentDidMount() {
    this.setState({ isLoadig: true }, () => {
      Axios.get("http://localhost:8080/thrifting/welcome/getsalebyuserid/" + this.state.currentUser.id).then((data) => {
        this.userSalesState(data.data)
        this.setState({
          isLoadig: false
        })
      })
    })

    Axios({
      method: 'post',
      url: "http://localhost:8080/thrifting/welcome/getUser",
      data: {
        id: this.state.currentUser.id,
      },headers: authHeader(),
    })
      .then((response) => {
        this.userstate(response.data)
        this.setState({
          currentUserPosition:{
              lon:response.data.userlongitude,
              lat:response.data.userlatitude
          }
      })

      })
      .catch(function (error) {
      });





  }

  userstate = (user) => {
    this.setState({
      myUser: user
    })
  }

  userSalesState = (sales) => {
    this.setState({
      userSales: sales
    })
  }

  reloadpage = () => {
    this.setState({ isLoadig: false }, () => {
      Axios.get("http://localhost:8080/thrifting/welcome/getsalebyuserid/" + this.state.currentUser.id).then((data) => {
        this.userSalesState(data.data)
        this.setState({
          isLoadig: false
        })
      })
    })

  }
  movetodetailspage = () => {
    this.props.history.push("/edituser")
    this.props.setuser(JSON.parse(localStorage.getItem('user')));
  }

  render() {
    return (

      this.state.isLoadig ? <div className="loading"></div> :
        <>
          <h1>Profile page</h1>
          <div className="profileflex">
            <div className="profiledetails">
              <div className="imgcontainer">
                <img src={`${myurl}` + this.state.myUser.photoUrl} target="_blank" alt="#" className="profileimg" />
              </div>
              <div className="infoDiv">
                <p className="profiletext"><strong>User Name :</strong> </p>
                {this.state.myUser.username}
              </div>
              <div className="infoDiv">
                <p><strong>Email :</strong> </p>
                {this.state.myUser.email}
              </div>
              <div className="infoDiv">
                <p><strong>First Name :</strong> </p>
                {this.state.myUser.firstName}
              </div >
              <div className="infoDiv">
                <p><strong>Last Name :</strong> </p>
                {this.state.myUser.lastName}
              </div>
              <div className="infoDiv">
                <p><strong>Telephone :</strong> </p>
                {this.state.myUser.telephone}
              </div>
              <div className="infoDiv">
                <p><strong>Country :</strong></p>
                {this.state.myUser.country}
              </div>
              <div className="infoDiv">
                <p><strong>Region :</strong> </p>
                {this.state.myUser.region}
              </div>
              <div className="infoDiv">
                <p><strong>Address :</strong></p>
                {this.state.myUser.address}
              </div>
              <div className="infoDiv">
                <p><strong>Zip Code :</strong></p>
                {this.state.myUser.zip}
              </div>
              <button className="detailsbutton" onClick={this.movetodetailspage}>Edit Details</button>
            </div>
            <div className="scroll displayusersales">
              <h3><strong>Your Sales</strong></h3>
              {this.state.userSales.length === 0 && (    
                <p className="emptybox"><strong>No posted Sales yet</strong></p>
              )}
              {this.state.userSales.map((sale) => {
                return <Sale key={sale.saleid} reloadfunction={this.reloadpage} mysale={sale} userRole={this.state.currentUser.roles[0]} currentUserPosition={this.state.currentUserPosition} ></Sale>
              })}
            </div>

          </div>
        </>
    );
  }
}
