import React from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import AuthService from "../Services/auth.service";
import authHeader from "../Services/auth-header"

const myurl = "http://localhost:8080/images/"


export default class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usersend: {},
            isLoadig: true,
            show: false,
            textboolean: false,
            msg: "",
            currentUser: AuthService.getCurrentUser(),
            dateStart: new Date().toLocaleString(),
        }
    }

    componentDidMount() {
        this.setState({ isLoadig: true }, () => {
        Axios({
            method: 'post',
            url: "http://localhost:8080/thrifting/welcome/getUser",
            data: {
                id: this.props.mymsg.usersendid,
            },headers: authHeader()
        })
            .then((response) => {
                this.setState({
                    usersend: response.data,
                    isLoadig: false
                })


            })
            .catch(function (error) {
            })
        })

    }

    handleDelete = () => {
        if (window.confirm("Are you sure you want to delete tha message ?")) {
            Axios.get("http://localhost:8080/thrifting/welcome/deleteMessage/" + this.props.mymsg.idMessages).then((response) => {
                this.props.reloadPage();
            })
        } else {
        }

    }
    handleShow = () => {
        this.setState({
            show: true,
        })
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    };
    handleMsg = (event) => {
        this.setState({ msg: event.target.value });
    }
    sendmsg = () => {

        const msg = {
            msgtext: this.state.msg,
            userreceiveid: this.state.usersend.user_id,
            usersendid: this.state.currentUser.id,
            saletitle: this.props.mymsg.saletitle,
            msgdate:this.state.dateStart
        }

        Axios({
            method: 'post',
            url: '/thrifting/welcome/insertMessage',
            data: msg,
        })
            .then((response) => {


            }, error => {

            })
        this.setState({
            textboolean: true
        })
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    };
    render() {
        return (
            this.state.isLoadig ? <div className="loading"></div> :
            <>
                <div className="msgcomponent">
                    <img src={`${myurl}` + this.state.usersend.photoUrl} target="_blank" alt="#" className="msgimage " />
                    <div className="msginfo">
                        <p>{this.props.mymsg.msgdate}</p>
                        <p><strong>{this.state.usersend.username}'s Message : </strong> </p>
                        <p>{this.props.mymsg.msgtext}</p>
                        <hr></hr>
                        <p><strong>Regarding Sale :</strong> {this.props.mymsg.saletitle}</p>
                    </div >
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header className="modalheader">
                            <Modal.Title>{this.state.usersend.username}'s Info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modalbody">
                            <img src={`${myurl}` + this.state.usersend.photoUrl} target="_blank" alt="#" className="detailsimg" />
                            <br></br>
                            <br></br>
                            <p><strong>Email:</strong> {this.state.usersend.email}</p>
                            <br></br>
                            <p><strong>Telephone:</strong> {this.state.usersend.telephone}</p>
                        </Modal.Body>
                        <Modal.Footer className="modalfooter">
                            {this.state.textboolean ? <div className="msgsend">Message send !! </div> :
                                <>
                                    <textarea type="text" onChange={this.handleMsg} value={this.state.msg}></textarea>
                                    <Button onClick={this.sendmsg}>Send msg</Button>
                                </>
                            }
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                                    </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="msgbuttons">
 
                        <Button className="contactbutton" onClick={this.handleDelete}> &#xf1f8; Delete </Button>

                        <Button className="contactbutton"
                            onClick={this.handleShow}>
                            <div><strong> &#xf112; Reply</strong></div>
                        </Button>


                    </div>
                </div>
            </>
        )
    }

}