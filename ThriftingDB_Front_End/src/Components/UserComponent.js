import React from 'react';
import { Button } from 'react-bootstrap';
import Axios from "axios";
import UserService from "../Services/user.service";





const myurl = "http://localhost:8080/images/"
export default class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            User: {},
            answer: "",
        };

    }


    handleDelete = () => {
        if (window.confirm("Warning this action will be irreversible are u sure you want to delete this sale??")) {
            Axios.get("http://localhost:8080/thrifting/welcome/deletesale/" + this.props.mysale.saleid).then((response) => {
                this.props.reloadfunction();
            })
        } else {
        }
    }
    deleteUser = () => {
        UserService.adminDeleteuser(this.props.myUser.user_id).then(
            response => {
                this.props.reloadpage();
                this.setState({
                    answer: response.data
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
    render() {
        return (
            <>
                <div className="saleDisplay">
                    <img src={`${myurl}` + this.props.myUser.photoUrl} target="_blank" alt="#" className="saleimg" />
                    <div className="saleTitle">
                        <p><strong>User Name:</strong> {this.props.myUser.username} </p>
                        <br></br>
                        <p ><strong>User id :</strong> {this.props.myUser.user_id}</p>
                    </div>
                    <div className="userinfo1">
                        <p><strong>First Name </strong>  </p>
                        {this.props.myUser.firstName}
                        <br></br>
                        <p><strong>Last Name </strong>  </p>
                        {this.props.myUser.lastName}


                    </div>
                    <div className="saleInfo2">
                        <p><strong>Location </strong></p>
                        <p>Country : {this.props.myUser.country} </p>
                        <p>Region : {this.props.myUser.region} </p>
                        <p>Address : {this.props.myUser.address} </p>
                    </div>
                    <div className="saleInfo2">
                        <p><strong>Contact </strong></p>
                        <p><strong>Email : </strong>{this.props.myUser.email}</p>
                        <p><strong>Telephone : </strong></p>
                        <p>{this.props.myUser.telephone} </p>
                    </div>
                    <div>
                        <Button id="adminbuttons" className="centerbutton" onClick={this.deleteUser}>Remove User</Button>
                    </div>




                </div>
            </>
        )
    }
}