import React from 'react';
import Axios from 'axios';

import {
    Form,
    Label, Input,
    Button,
} from 'reactstrap';

import FileBase64 from './react-file-base64';
import authHeader from "../Services/auth-header"

const initState = {

    userid: "",

    categories: [],
    selectedCategory: "",

    genders: [],
    selectedGender: "",

    sizes: [],
    selectedSize: "",
    filteredSizes: [],

    conditions: [],
    selectedCondition: "",

    title: "",
    titleError: "",

    comment: "",
    commentError: "",

    dateStart: new Date().toLocaleString(),

    price: "",

    files: [],
    imageError: "",

    myerrors: [],

    backendError: [],

    isLoadig: false


}

export default class SaleForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = initState;
    }

    componentDidMount() {

        Axios.get("http://localhost:8080/thrifting/welcome/categories").then((data) => {
            this.setState({
                categories: data.data
            })
        });

        Axios.get("http://localhost:8080/thrifting/welcome/gender").then((data) => {
            this.setState({
                genders: data.data
            })
        });

        Axios.get("http://localhost:8080/thrifting/welcome/sizes").then((data) => {
            this.setState({
                sizes: data.data
            })
        });

        Axios.get("http://localhost:8080/thrifting/welcome/conditions").then((data) => {
            this.setState({
                conditions: data.data
            })
        });

    }

    onChangeCategory = (e) => {
        const selectedCategory = e.target.value
        this.setState(
            () => {
                let filteredSizes;
                if (selectedCategory === "1" || selectedCategory === "2") {
                    filteredSizes = this.state.sizes.filter((size) => {
                        return size.sizeid < 10
                    })
                }
                else if (selectedCategory === "0") {
                    filteredSizes = []
                }
                else if (selectedCategory === "3") {
                    filteredSizes = this.state.sizes.filter((size) => {
                        return size.sizeid > 10
                    })
                }
                return {
                    filteredSizes,
                    selectedCategory
                }
            }
        )



    }
    onChangeGender = (e) => {
        this.setState({
            selectedGender: e.target.value
        })
    }
    onChangeSize = (e) => {
        this.setState({
            selectedSize: e.target.value
        })
    }
    onChangeCondition = (e) => {
        this.setState({
            selectedCondition: e.target.value
        })
    }

    validate = () => {
        let titleError = "";
        let imageError = "";
        let commentError = "";

        if (this.state.title === null || this.state.title.trim() === "") {
            titleError = "this field cannot be empty"
        }
        if (this.state.title.length < 3 || this.state.title.length > 40) {
            titleError = "Title must be between 3-40 Characters"
        }


        if (this.state.files[0].phototype !== "image/jpeg" && this.state.files[0].phototype !== "image/png") {
            imageError = "File should be .png or .jpeg!!"
        }


        if (this.state.comment === null || this.state.comment.trim() === "") {
            commentError = "this field cannot be empty"
        }
        if (this.state.comment.length < 3 || this.state.comment.length > 40) {
            commentError = "Comment must be between 3-40 Characters"
        }



        if (titleError || imageError || commentError) {
            this.setState({ titleError, imageError, commentError })
            return false;
        }
        return true
    }
    onSubmit = (e) => {

        e.preventDefault();
        const isValid = this.validate();
        const sale = {
            condid: this.state.selectedCondition,
            genderid: this.state.selectedGender,
            sizeid: this.state.selectedSize,
            categoryid: this.state.selectedCategory,
            title: this.state.title,
            comment: this.state.comment,
            datestart: this.state.dateStart,
            price: this.state.price,
            userid: this.props.currentuser.id,
            photoname: this.state.files[0].photoname,
            phototype: this.state.files[0].phototype,
            photosize: this.state.files[0].photosize,
            photoBase64: this.state.files[0].photobase64,
        }
        if (isValid) {
            this.setState({ isLoadig: true }, () => {
                Axios({
                    method: 'post',
                    url: 'http://localhost:8080/thrifting/welcome/insertsale',
                    data: sale,headers: authHeader(),

                })
                    .then((response) => {
                        this.setState({
                            isLoadig: false
                        })

                        this.props.history.push("/profile")


                    }, error => {

                        this.setState(() => {
                            return {
                                backendError: error.response.data.errors,
                                isLoadig: false
                                // importantError: error.response.data.message
                            }
                        })
                    }
                    )
            })

        }

    }
    getFiles(files) {
        this.setState({ files: files })
    }

    render() {

        return (
            this.state.isLoadig ? <div className="loading"></div> :
                <>
                    <div className="saleformaincontainer">
                        <div className="saleerrors">
                            {this.state.backendError && (
                                this.state.backendError.map((error) => {
                                    return (
                                        <div style={{ color: "red", fontSize: 12 }} >{error}</div>
                                    )
                                })
                            )}
                            {/* <div>asdf</div> */}
                        </div>
                        <div className="saleinput">

                            <Form onSubmit={this.onSubmit.bind(this)} className="saleformcss">
                                <Label for="title"><strong>Title</strong></Label>
                                <Input id="title" type="text" placeholder="title" required
                                    value={this.state.title}
                                    onChange={e => this.setState({ title: e.target.value })} />
                                <div style={{ color: "red", fontSize: 12 }} >
                                    {this.state.titleError}
                                </div>
                                <br></br>
                                <div className="inlineoptions">
                                    <div>
                                        <p><strong>Choose category :</strong></p>
                                        <select value={this.state.selectedCategory}
                                            onChange={this.onChangeCategory}
                                        >
                                            <option value="0">Choose Category</option>
                                            {this.state.categories.map((category) => <option key={category.categoryid} value={category.categoryid}>{category.category}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <p><strong>Choose gender :</strong></p>
                                        <select value={this.state.selectedGender}
                                            onChange={this.onChangeGender}>
                                            <option value="0" >Choose gender</option>
                                            {this.state.genders.map((gender) => <option key={gender.genderid} value={gender.genderid}>{gender.gender}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <br></br>

                                <div className="inlineoptions">
                                    <div>
                                        <p><strong> Choose Condition :</strong></p>
                                        <select value={this.state.selectedCondition}
                                            onChange={this.onChangeCondition}>
                                            <option value="0" >Choose Condition</option>
                                            {this.state.conditions.map((condition) => <option key={condition.conditionid} value={condition.conditionid}>{condition.condition}</option>)}
                                        </select>


                                    </div>
                                    <div>
                                        <p><strong>   Choose size : </strong></p>
                                        <select value={this.state.selectedSize}
                                            onChange={this.onChangeSize}>
                                            <option value="0" >Choose Size</option>
                                            {this.state.filteredSizes.map((size) => <option key={size.sizeid} value={size.sizeid}>{size.size}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <p><strong>  Upload Photo </strong></p>
                                    <FileBase64
                                        multiple={true}
                                        onDone={this.getFiles.bind(this)} />
                                    <div style={{ color: "red", fontSize: 12 }} >
                                        {this.state.imageError}
                                    </div>
                                </div>



                                <Label for="comment"><strong>Comment</strong></Label>
                                <Input id="comment" type="text" placeholder="comment" required
                                    value={this.state.comment}
                                    onChange={e => this.setState({ comment: e.target.value })} />
                                <div style={{ color: "red", fontSize: 12 }} >
                                    {this.state.commentError}
                                </div>
                                <br></br>
                                <p><strong>Price</strong></p>
                                <div className="submitprice">


                                    <Input id="price" type="number" placeholder="number" required
                                        value={this.state.price}
                                        onChange={e => this.setState({ price: e.target.value })} />
                                    <br></br>

                                    <Button type="submit" className="subButton">Post Sale</Button>
                                </div>
                            </Form>
                        </div>
                        <div className="saleformimg">
                            <div className="imgcontainer imgpart">
                                <img alt="Qries" className="saleformimg myimage" src={require("../images/loginimg.PNG")}
                                />
                                <p className="centered2" ><strong>SALE NOW!!</strong>  </p>
                            </div>
                        </div>

                    </div>
                </>
        );
    }

}