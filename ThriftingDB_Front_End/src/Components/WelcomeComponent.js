import React, { Component } from "react";

import { Modal, Button } from 'react-bootstrap'

export default class WelcomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      show: false,
      showContact:false
    };

    this.handleClick= this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClickContact = this.handleClickContact.bind(this)
    this.handleCloseContact = this.handleCloseContact.bind(this)
  }

  componentDidMount() {
    // UserService.getPublicContent().then(
    //   response => {
    //     this.setState({
    //       content: response.data
    //     });
    //   },
    //   error => {
    //     this.setState({
    //       content:
    //         (error.response && error.response.data) ||
    //         error.message ||
    //         error.toString()
    //     });
    //   }
    // );
  }

  handleClick (){
    this.setState({

      show:true
    })

  }

  handleClickContact (){
    this.setState({

      showContact:true
    })

  }

  handleClose(){

    this.setState({

      show:false
    })
  }

  handleCloseContact(){

    this.setState({

      showContact:false
    })
  }

  render() {

   
    return (

        <div className="homecontainer">

            <div id="welcomemsg">
              <p>Welcome to our Online Thrift Store </p>
            </div>
            <div className="mylinks">
              <div className="noPadding">
                <Button className="aboutUs" href= "/login" variant="light">
                 <span>Login</span>
           </Button>
              </div>
              <div className="noPadding">
                <Button className="aboutUs" href= "/register" variant="light">
                <span>Register</span>
           </Button>
              </div>
              <div className="noPadding">
                  <Button className="aboutUs"
                                onClick={this.handleClick} variant="light">
                                <div > <span>About us</span></div>
                            </Button>
                            <Modal show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header className="aboutUsmodalheader">
                                    <Modal.Title>About Us</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="aboutUsmodalbody">
                                <p>Welcome to Online Trift Store, your number one source for all things about YOU. 
                                    We're dedicated to providing you the very best of clothes, accessories,shoes with an emphasis on YOU, YOU and YOU.You will have a great variety of things to choose from and you will
                                    be able to communicate directly with other users and inform them about your need.In our site everyone is a merchant and a buyer
                                

                        Founded in 2020 by Alkis and Lambros, Online Trift Store has just started its journey from 2 computers.
                          When we first started out, our passion for an online marketplace drove us to start our own business.

                        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.

                        Sincerely,
                        
                        Lambros & Alkis</p>
                            <hr/>
                            <div className="imgCenter">
                            <img alt="logo" className="logoImg" src={require("../images/thrifting.JPG")} ></img>
                            </div>
        
                                </Modal.Body>
                                <Modal.Footer className="aboutUsmodalheader">

                                    <Button variant="light" onClick={this.handleClose}>
                                        Close
                            </Button>
                                </Modal.Footer>
                            </Modal>
                  </div>

                  <div className="noPadding">
                            <Button className="aboutUs" variant="light" onClick={this.handleClickContact}>
                            <span>Contact us</span>
                          </Button>
                          <Modal show={this.state.showContact} onHide={this.handleCloseContact}>
                                <Modal.Header className="aboutUsmodalheader">
                                    <Modal.Title>Contact Us</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="aboutUsmodalbody">
                                <div className="imgCenter">
                                <img alt="logo" className="logoImg" src={require("../images/letter.jpg")} />
                                </div>
                                <div className="contactForm">
                                <div className="contactDiv">
                                        <input className="testIn" type ="input" value="Tel. +30 21 0372 9050" disabled />
                                    </div>
 
                                    <div className="contactDiv">
                                        <input className="testIn" type ="input" value="@: onlinethriftingStore@gmail.com" disabled/>
                                    </div>
                                    <hr/>
                                   
                                
                                </div>
                                <div className="contactDiv">
                                    <iframe title="headquarters"src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6289.778246570299!2d23.730675946359863!3d37.97971679647588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgr!4v1599578217216!5m2!1sen!2sgr" 
                                        width="80%" height="350" frameborder="0" 
                                        allowfullscreen></iframe>

                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="aboutUsmodalheader">

                                    <Button variant="light" onClick={this.handleCloseContact}>
                                        Close
                            </Button>
                                </Modal.Footer>
                            </Modal>
                  </div>
            </div>
              
          <img alt="Qries" className="myimage" src={require("../images/mymainimg.PNG")}
          />
        </div>


    );
  }
}
