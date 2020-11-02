import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import AuthService from "../Services/auth.service";
import Axios from "axios";
import PayWithPaypal from './PayWithPaypal';





const myurl = "http://localhost:8080/images/"
export default class Sale extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            currentUser: AuthService.getCurrentUser(),
            delete: "",
            msg: "",
            textboolean: false,
            isClicked: false,
            distance: "",
            sellerLongitude: this.props.mysale.userid.userlongitude,
            sellerlatidute: this.props.mysale.userid.userlatitude,
            distanceColor: {},
            msgdate: new Date().toLocaleString(),
            showimage: false
        };
        this.handlePay = this.handlePay.bind(this)
    }


    componentDidMount() {
        let lat1 = this.state.sellerlatidute
        let lon1 = this.state.sellerLongitude
        let lat2 = this.props.currentUserPosition.lat
        let lon2 = this.props.currentUserPosition.lon
        this.setState({ distance: this.distance(lat1, lon1, lat2, lon2).toFixed(2) }, () => {
            return this.setDistanceColor();
        })

    }

    distance = (lat1, lon1, lat2, lon2) => {
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p)) / 2;
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }
    handleMsg = (event) => {
        this.setState({ msg: event.target.value });
    }
    setDistanceColor = () => {
        if (this.state.distance < 30) {
            this.setState({
                distanceColor: {
                    color: "green"
                }
            })
        } else if (this.state.distance >= 30) {
            this.setState({
                distanceColor: {
                    color: "red"
                }
            })
        }
    }


    sendmsg = () => {

        const msg = {
            msgtext: this.state.msg,
            userreceiveid: this.props.mysale.userid.user_id,
            usersendid: this.state.currentUser.id,
            saletitle: this.props.mysale.title,
            msgdate: this.state.msgdate
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
            show: false,
            isClicked: false,
            showimage: false
        })
    };
    handleShow = () => {
        this.setState({
            show: true,
        })
    }
    reloadSales = () => {
        this.props.reloadfunction();
    }
    handlePay = () => {

        this.setState({

            isClicked: true,
            show: true
        })
    }
    handleDelete = () => {
        if (window.confirm("Warning this action will be irreversible are u sure you want to delete this sale??")) {
            Axios.get("http://localhost:8080/thrifting/welcome/deletesale/" + this.props.mysale.saleid).then((response) => {
                this.props.reloadfunction();
            })
        } 

    }
    handleImgClick = () => {
        this.setState({
            showimage: true,
            // show:true,
        })
    }

    render() {

        if (this.state.isClicked) {
            return (

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header className="paymentModal">
                        <Modal.Title>Payment Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="paymentModalbody">
                        <PayWithPaypal price={this.props.mysale.price}
                            category={this.props.mysale.categoryid.category}
                            size={this.props.mysale.sizeid.size}
                            condition={this.props.mysale.condid.condition}
                            gender={this.props.mysale.genderid.gender}
                            id={this.props.mysale.saleid}
                            reloadSales={this.reloadSales}
                        />
                    </Modal.Body>
                    <Modal.Footer className="paymentModal">

                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
         </Button>
                    </Modal.Footer>
                </Modal>
            )

        }
        return (
            <>
                {this.state.showimage && (
                    <Modal show={this.state.showimage} onHide={this.handleClose}>
                        <Modal.Header className="paymentModal">

                        </Modal.Header>
                        <Modal.Body className="paymentModalbody">
                            <img src={`${myurl}` + this.props.mysale.photoUrl} target="_blank" alt="#" className="modalimage" />
                        </Modal.Body>
                        <Modal.Footer className="paymentModal">

                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                )}
                <div className="saleDisplay">
                    <img onClick={this.handleImgClick} src={`${myurl}` + this.props.mysale.photoUrl} target="_blank" alt="#" className="saleimg" />
                    <div className="saleTitle">

                        <p>{this.props.mysale.title} </p>
                        <br></br>
                        <p id="pricestyle"><strong>Price:</strong> {this.props.mysale.price} &euro; </p>

                        {(this.state.distance != 0) && (this.state.distance < 1000) && (
                            <p><strong>Distance:</strong> <span style={this.state.distanceColor}>{this.state.distance} Km</span></p>
                        )}

                    </div>
                    <div className="saleInfo1">
                        <p><strong>Posted By: </strong>{this.props.mysale.userid.username}</p>

                        <p><strong>Date posted:</strong>  </p>
                        {this.props.mysale.datestart}
                        <br></br>
                        <p><strong>Comments:</strong>  </p>
                        {this.props.mysale.comment}


                    </div>
                    <div className="saleInfo2">
                        <p><strong>Details :</strong></p>
                        <p>Category : {this.props.mysale.categoryid.category} </p>
                        <p>Gender : {this.props.mysale.genderid.gender} </p>
                        <p>Size : {this.props.mysale.sizeid.size} </p>
                        <p>Condition : {this.props.mysale.condid.condition} </p>
                    </div>
                    {this.state.currentUser.id === this.props.mysale.userid.user_id && (
                        <div className="salelinks">
                            <button onClick={this.handleDelete} id="userdelete"> &#xf1f8; <strong>Delete</strong></button>
                        </div>
                    )}
                    {this.state.currentUser.id !== this.props.mysale.userid.user_id &&
                        (<div className="salelinks">
                            <Button className="contactbutton" onClick={this.handlePay}  ><strong>buy now</strong></Button>
                            <br></br>
                            <Button className="contactbutton"
                                onClick={this.handleShow}>
                                <div className="inside"><strong>Contact Seller</strong></div>
                            </Button>
                            <Modal show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header className="modalheader">
                                    <Modal.Title>{this.props.mysale.userid.username}'s Info</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="modalbody">
                                    <img src={`${myurl}` + this.props.mysale.userid.photoUrl} target="_blank" alt="#" className="contactimage" />
                                    <br></br>
                                    <br></br>
                                    <p><strong>Email:</strong> {this.props.mysale.userid.email}</p>
                                    <br></br>
                                    <p><strong>Telephone:</strong> {this.props.mysale.userid.telephone}</p>
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
                            {this.props.userRole === "ROLE_ADMIN" && (
                                <Button onClick={this.handleDelete} id="adminbuttons">REMOVE SALE</Button>
                            )}
                        </div>)}


                </div>
            </>
        )
    }
}