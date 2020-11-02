
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Row
} from 'reactstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import React from 'react';
import FileBase64 from './react-file-base64';


const initState = {
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    email: "",
    emailError: "",
    username: "",
    userNameError: "",
    password: "",
    confirmPassword: "",
    passwordError: "",
    telephone: "",
    telephoneError: "",
    country: "",
    address: "",
    addressError: "",
    region: "",
    zip: "",
    zipError: "",
    files: [],
    importantError: "",
    backendError: [],
    longitude: 0,
    latitude: 0,
    isLoadig: false
}

export default class Register extends React.Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initState;
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError)
        }
    }
    geoError = (error) => {

    }
    geoSuccess = (position) => {

        const mycoords = position.coords
        let lon = mycoords.longitude
        let lat = mycoords.latitude
        this.setState({
            longitude: lon,
            latitude: lat,
        })
      
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
        this.setState({ region: val });
    }

    getFiles(files) {
        this.setState({ files: files })
    }



    validate = () => {
        let emailError = "";
        let firstNameError = "";
        let lastNameError = "";
        let passwordError = "";
        let telephoneError = "";
        let zipError = "";
        let addressError = "";
        let userNameError = "";
        let importantError = "";

        var letters = /^[a-zA-Z\s]*$/;

        var numbers = /^[0-9]*$/;

        if (this.state.firstName.length < 3 || this.state.firstName.length > 20) {
            firstNameError = "Name must be between 3-20 letters"
        }
        if (this.state.firstName === null || this.state.firstName.trim() === "") {
            firstNameError = "this field cannot be empty"
        }
        if (!this.state.firstName.match(letters)) {
            firstNameError = "this field should only contain letters"
        }

        if (this.state.username.length < 3 || this.state.username.length > 20) {
            userNameError = "User Name must be between 3-20 letters"
        }
        if (this.state.username === null || this.state.username.trim() === "") {
            userNameError = "this field cannot be empty"
        }
        if (!this.state.username.match(letters)) {
            userNameError = "this field should only contain letters"
        }



        if (this.state.lastName.length < 3 || this.state.firstName.length > 20) {
            lastNameError = "Last name must be between 3-20 letters"
        }
        if (this.state.lastName === null || this.state.lastName.trim() === "") {
            lastNameError = "this field cannot be empty"
        }
        if (!this.state.lastName.match(letters)) {
            lastNameError = "this field should only contain letters"
        }



        if (this.state.email === null || this.state.email === "") {
            emailError = "this field cannot be empty"
        }

        if (!this.state.email.includes('@')) {
            emailError = "invalid email"
        }



        if (this.state.password.length < 6) {
            passwordError = "password should be  6 pr more characters"
        }
        if (this.state.password === null || this.state.password === "") {
            passwordError = "this field cannot be empty"
        }
        if (this.state.confirmPassword !== this.state.password) {
            passwordError = "no matching password please retype"
        }


        if (this.state.telephone.length < 10) {
            telephoneError = "u should enter a 10-digit number"
        }

        if (this.state.telephone === null || this.state.telephone === "") {
            telephoneError = "this field cannot be empty"
        }

        if (!this.state.telephone.match(numbers)) {
            telephoneError = "this field should only contain numbers"
        }

        if (!this.state.zip === null || this.state.zip === "") {
            zipError = "this field cannot be empty"
        }
        if (this.state.zip.length < 3 || this.state.zip.length > 5) {
            zipError = "Zip should be between 3-5 numbers "
        }
        if (!this.state.zip.match(numbers)) {
            zipError = "this field should only contain numbers"
        }

        if (!this.state.address === null || this.state.address === "") {
            addressError = "this field cannot be empty"
        }
        if (this.state.address.length < 3 || this.state.address.length > 45) {
            addressError = "Address should be between 3-45 Characters"
        }


        if (this.state.files[0].phototype !== "image/jpeg" && this.state.files[0].phototype !== "image/png") {
            importantError = "File should be .png or .jpeg!!"
        }



        if (emailError || firstNameError || lastNameError || passwordError || telephoneError || zipError || addressError || userNameError || importantError) {
            this.setState({ emailError, firstNameError, userNameError, lastNameError, passwordError, telephoneError, zipError, addressError, importantError });
            return false;
        }
        return true;
    }

    onSubmit(e) {

        e.preventDefault();

        const isValid = this.validate();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            telephone: this.state.telephone,
            country: this.state.country,
            address: this.state.address,
            region: this.state.region,
            zip: this.state.zip,
            photoname: this.state.files[0].photoname,
            phototype: this.state.files[0].phototype,
            photosize: this.state.files[0].photosize,
            photoBase64: this.state.files[0].photobase64,
            userslongitude: this.state.longitude,
            userslatitude: this.state.latitude
        }




        if (isValid) {
            this.setState({ isLoadig: true }, () => {
                Axios({
                    method: 'post',
                    url: '/thrifting/welcome/signup',
                    data: user,

                })
                    .then((response) => {

                        this.props.history.push("/")


                    }, error => {
 
                        this.setState(() => {
                            return {
                                backendError: error.response.data.errors,
                                importantError: error.response.data.message,
                                isLoadig: false
                            }
                        });
                    })
            })
        }
    }


    render() {

        return (
            this.state.isLoadig ? <div className="loading"></div> :

                <div className="registerform">
                    <div className="imgpart">
                        <img alt="Qries" className="myimage" src={require("../images/registerpic.PNG")}
                        />
                        <div className="centered">REGISTER NOW!</div>
                    </div>

                    <div className="formpart">
                        <Container>

                            <Form onSubmit={this.onSubmit.bind(this)} className="asdasd">
                                <Col>
                                    <FormGroup>
                                        <Row>
                                            <div className="col-6">
                                                <Label for="firstName">First Name</Label>
                                                <Input id="firstName" type="text" placeholder="First Name" required
                                                    value={this.state.firstName}
                                                    onChange={e => this.setState({ firstName: e.target.value })} />
                                                <div style={{ color: "red", fontSize: 12 }} >
                                                    {this.state.firstNameError}
                                                </div>
                                            </div>
                                            <div className="col-6">

                                                <br></br>
                                                <CountryDropdown style={{ width: "60%", height: "35px", borderRadius: "5px", marginTop: "10px", opacity: "0.5" }} required
                                                    value={this.state.country}
                                                    onChange={(val) => this.selectCountry(val)} />
                                            </div>
                                        </Row>

                                        <Row>
                                            <div className="col-6">
                                                <Label for="lastName">Last Name</Label>
                                                <Input placeholder="Last Name"
                                                    value={this.state.lastName}
                                                    onChange={e => this.setState({ lastName: e.target.value })} />
                                                <div style={{ color: "red", fontSize: 12 }} >
                                                    {this.state.lastNameError}
                                                </div>
                                            </div>
                                            <div className="col-6">

                                                <br></br>
                                                <RegionDropdown style={{ width: "60%", height: "35px", borderRadius: "5px", opacity: "0.5" }} required
                                                    blankOptionLabel="No country selected."
                                                    country={this.state.country}
                                                    value={this.state.region}
                                                    onChange={(val) => this.selectRegion(val)} />
                                            </div>
                                        </Row>


                                        <Row>
                                            <div className="col-6">
                                                <Label for="email">Email</Label>
                                                <Input placeholder="Email" required
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })} />
                                                <div style={{ color: "red", fontSize: 12 }} >
                                                    {this.state.emailError}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <Label for="address">Street address</Label>
                                                <Input placeholder="Street Address"
                                                    value={this.state.address}
                                                    onChange={e => this.setState({ address: e.target.value })} />
                                                <div style={{ color: "red", fontSize: 12 }} >
                                                    {this.state.addressError}
                                                </div>
                                            </div>

                                        </Row>
                                        <Row>
                                            <div className="col-6">
                                                <Label for="userName">User Name</Label>
                                                <Input placeholder="User Name" required
                                                    value={this.state.username}
                                                    onChange={e => this.setState({ username: e.target.value })} />
                                                <div style={{ color: "red", fontSize: 12 }} >
                                                    {this.state.userNameError}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <Label for="zip">ZIP</Label>
                                                <Input placeholder="ZIP"
                                                    value={this.state.zip}
                                                    onChange={e => this.setState({ zip: e.target.value })} />
                                                <div style={{ color: "red", fontSize: 12 }} >
                                                    {this.state.zipError}
                                                </div>
                                            </div>
                                        </Row>

                                        <Row>
                                            <div className="col-6">
                                                <Label for="password">Password</Label>
                                                <Input type="password" placeholder="Password" required
                                                    value={this.state.password}
                                                    onChange={e => this.setState({ password: e.target.value })} />
                                                <div style={{ color: "red", fontSize: 12 }} >
                                                    {this.state.passwordError}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <Label for="telephone">Telephone</Label>
                                                <Input placeholder="Telephone" required
                                                    value={this.state.telephone}
                                                    onChange={e => this.setState({ telephone: e.target.value })} />
                                                <div style={{ color: "red", fontSize: 12 }} >
                                                    {this.state.telephoneError}
                                                </div>
                                            </div>
                                        </Row>

                                        <Row>
                                            <div className="col-6">
                                                <Label for="confirmPassword">Re-type Password</Label>
                                                <Input type="password" placeholder="Re-type Password" required
                                                    value={this.state.confirmPassword}
                                                    onChange={e => this.setState({ confirmPassword: e.target.value })} />
                                                <div style={{ color: "red", fontSize: 12 }} >
                                                    {this.state.passwordError}
                                                </div>


                                            </div>

                                            <div className="col-6">
                                                <Label >Upload Photo</Label>
                                                <FileBase64
                                                    multiple={true}
                                                    onDone={this.getFiles.bind(this)} />
                                            </div>
                                        </Row>

                                        <br></br>
                                        <div className="registermsg">
                                            <Button id="siginbtn" type="submit">Register</Button>
                                            <div className="importantmsg">
                                                {this.state.importantError && (
                                                    <div style={{ color: "red", fontSize: 12, backgroundColor: "white" }} >{this.state.importantError}</div>
                                                )
                                                }
                                            </div>
                                            <div className="backendmsg">
                                                {this.state.backendError && (
                                                    this.state.backendError.map((error) => {
                                                        return (
                                                            <div style={{ color: "red", fontSize: 12 }} >{error}</div>
                                                        )
                                                    })
                                                )}
                                            </div>
                                        </div>
                                    </FormGroup>

                                </Col>
                            </Form>
                        </Container>
                    </div>
                </div>
        );
    }
}