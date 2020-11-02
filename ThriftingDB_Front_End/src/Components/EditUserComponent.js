
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container, Col, Form, Button,
  FormGroup, Label, Input,
  Row
} from 'reactstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import React from 'react';
import FileBase64 from './react-file-base64';
import AuthService from "../Services/auth.service";
import authHeader from "../Services/auth-header"

const myurl = "http://localhost:8080/images/"

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
  region: "",
  zip: "",
  files: [],
  longitude: null,
  latitude: null,
  currentUser: AuthService.getCurrentUser(),
  myUser: {},
  photocheck: false,
  importantError: "",
  backendError: [],
}


export default class Edituser extends React.Component {
  constructor() {
    super();
    this.state = initState;
  }

  componentDidMount() {

    Axios({
      method: 'post',
      url: "http://localhost:8080/thrifting/welcome/getUser",
      data: {
        id: this.props.myUser.id,
      },headers: authHeader()
    })
      .then((response) => {
        this.setState({
          myUser: response.data
        })
        this.setState({
          firstName: this.state.myUser.firstName,
          lastName: this.state.myUser.lastName,
          email: this.state.myUser.email,
          username: this.state.myUser.username,
          country: this.state.myUser.country,
          region: this.state.myUser.region,
          address: this.state.myUser.address,
          zip: this.state.myUser.zip,
          telephone: this.state.myUser.telephone,
        })
      })
      .catch(function (error) {
      });

  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
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


    if (this.state.password.length !== 0) {

      if (this.state.password.length < 6) {
        passwordError = "password should be  6 pr more characters"
      }
      if (this.state.password === null || this.state.password === "") {
        passwordError = "this field cannot be empty"
      }
      if (this.state.confirmPassword !== this.state.password) {
        passwordError = "no matching password please retype"
      }
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


    if (!(this.state.files === undefined || this.state.files == 0)) {
      if (this.state.files[0].phototype !== "image/jpeg" && this.state.files[0].phototype !== "image/png") {
        importantError = "File should be .png or .jpeg!!"
      }
    }


    if (emailError || firstNameError || lastNameError || passwordError || telephoneError || zipError || addressError || userNameError || importantError) {
      this.setState({ emailError, firstNameError, userNameError, lastNameError, passwordError, telephoneError, zipError, addressError, importantError });
      return false;
    }

    return true;

  }

  getFiles(files) {
    this.setState({
      files: files,
      photocheck: true
    })
  }

  onSubmit(e) {
    let user = {}
    e.preventDefault();
    const isValid = this.validate();
    if (this.state.photocheck) {
      user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        telephone: this.state.telephone,
        country: this.state.country,
        address: this.state.address,
        region: this.state.region,
        zip: this.state.zip,
        password: this.state.password,
        userid: this.props.myUser.id,
        photoname: this.state.files[0].photoname,
        phototype: this.state.files[0].phototype,
        photosize: this.state.files[0].photosize,
        photoBase64: this.state.files[0].photobase64,
      }
    } else {
      user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        telephone: this.state.telephone,
        country: this.state.country,
        address: this.state.address,
        region: this.state.region,
        zip: this.state.zip,
        password: this.state.password,
        userid: this.props.myUser.id,
      }
    }

    if (isValid) {
      Axios({
        method: 'post',
        url: '/thrifting/welcome/edituser',
        data: user,
        headers: authHeader()
      })
        .then((response) => {
          this.props.history.push("/profile")
        }, error => {
        
          this.setState(() => {
            return {
              backendError: error.response.data.errors,
              importantError: error.response.data.message
            }
          });
        })
    }
  }

  render() {

    return (
      <div className="registerform">
        <div>
          <img className="editimg" src={myurl + this.state.myUser.photoUrl}
            alt="#" />
          <div className="col-6 imginput">
            <FileBase64
              multiple={true}
              onDone={this.getFiles.bind(this)} />
          </div>
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
        <div className="formpart">
          <Container>
            <Form onSubmit={this.onSubmit.bind(this)}>
              <Col>
                <FormGroup>
                  <h2>Edit your profile</h2>
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
                      <Input placeholder="Last Name" required
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
                      <Label for="password">Change Password - (Optional) </Label>
                      <Input type="password" placeholder="Password"
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
                      <Input type="password" placeholder="Re-type Password"
                        value={this.state.confirmPassword}
                        onChange={e => this.setState({ confirmPassword: e.target.value })} />
                      <div style={{ color: "red", fontSize: 12 }} >
                        {this.state.passwordError}
                      </div>
                    </div>
                  </Row>
                  <br></br>
                  <div className="registermsg">
                    <Button id="siginbtn" type="submit">Submit Changes</Button>
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