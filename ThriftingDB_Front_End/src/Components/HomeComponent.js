import React from 'react';
import Axios from 'axios';
import Sale from './Sale'
import AuthService from "../Services/auth.service";
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
    files: [],
    sales: [],
    isLoadig: true,
    currentUser: {  },
    isLoadig2: true,
    currentUserPosition: {},
    selectedPrice: ""
}


export default class HomeComponent extends React.Component {
    constructor() {
        super()
        this.state = initState
    }


    componentDidMount() {
        this.setState({
            currentUser: AuthService.getCurrentUser()
        })

        Axios.get("http://localhost:8080/thrifting/welcome/sizes").then((data) => {
            this.setState({
                sizes: data.data
            })
        })
        this.setState({ isLoadig: true }, () => {
            Axios.get("http://localhost:8080/thrifting/welcome/getsales/").then((response) => {
                this.setState({
                    sales: response.data,
                    isLoadig: false,
                    isLoadig2: false,
                    currentUser: AuthService.getCurrentUser(),
                })
            })
        })
        Axios.get("http://localhost:8080/thrifting/welcome/categories").then((data) => {
            this.setState({
                categories: data.data
            })
        })
        Axios.get("http://localhost:8080/thrifting/welcome/gender").then((data) => {
            this.setState({
                genders: data.data
            })
        })
        this.setState({ currentUser: AuthService.getCurrentUser() }, () => {
            Axios({
                method: 'post',
                url: "http://localhost:8080/thrifting/welcome/getUser",
                data: {
                    id: this.state.currentUser.id
                },headers: authHeader()
            })
                .then((response) => {
                    this.setState({
                        currentUserPosition: {
                            lon: response.data.userlongitude,
                            lat: response.data.userlatitude
                        }
                    })
                })
                .catch(function (error) {
                })
        })
    }

    womenAxios = () => {
        this.setState({ isLoadig2: true }, () => {
            Axios.get("http://localhost:8080/thrifting/welcome/getsalebygender/2").then((response) => {
                this.setState({
                    sales: response.data,
                    isLoadig2: false
                })
            })
        })
    }
    menAxios = () => {
        this.setState({ isLoadig2: true }, () => {
            Axios.get("http://localhost:8080/thrifting/welcome/getsalebygender/1").then((response) => {
                this.setState({
                    sales: response.data,
                    isLoadig2: false
                })
            })
        })
    }

    kidAxios = () => {
        this.setState({ isLoadig2: true }, () => {
            Axios.get("http://localhost:8080/thrifting/welcome/getsalebygender/3").then((response) => {
                this.setState({
                    sales: response.data,
                    isLoadig2: false
                })
            })
        })
    }
    uniAxios = () => {
        this.setState({ isLoadig2: true }, () => {
            Axios.get("http://localhost:8080/thrifting/welcome/getsalebygender/4").then((response) => {
                this.setState({
                    sales: response.data,
                    isLoadig2: false
                })
            })
        })
    }
    allAxios = () => {
        this.setState({ isLoadig2: true }, () => {
            Axios.get("http://localhost:8080/thrifting/welcome/getsales/").then((response) => {
                this.setState({
                    sales: response.data,
                    isLoadig2: false
                })
            })
        })
    }
    onChangeCategory = async (e) => {
        await this.setState({
            selectedCategory: e.target.value
        })
        if (this.state.selectedCategory === "0") {
            this.setState({ isLoadig2: true }, () => {
                Axios.get("http://localhost:8080/thrifting/welcome/getsales/").then((response) => {
                    this.setState({
                        sales: response.data,
                        isLoadig2: false
                    })
                })
            })
        } else {
            this.setState({ isLoadig2: true }, () => {
                Axios.get("http://localhost:8080/thrifting/welcome/getsalebycategory/" + this.state.selectedCategory).then((response) => {
                    this.setState({
                        sales: response.data,
                        isLoadig2: false
                    })
                })
            })
            if (this.state.selectedCategory === "1") {

                const filteredSizes = this.state.sizes.filter((size) => {
                    return size.sizeid < 10
                })
                this.setState({
                    filteredSizes: filteredSizes
                })

            }
            else if (this.state.selectedCategory === "3") {
                const filteredSizes = this.state.sizes.filter((size) => {
                    return size.sizeid > 10
                })

                this.setState({
                    filteredSizes: filteredSizes
                })
            }
        }
    }
    onChangeSize = async (e) => {
        await this.setState({
            selectedSize: e.target.value
        })
        if (this.state.selectedSize === "0") {
            this.setState({ isLoadig2: true }, () => {
                Axios.get("http://localhost:8080/thrifting/welcome/getsales/").then((response) => {
                    this.setState({
                        sales: response.data,
                        isLoadig2: false
                    })
                })
            })
        } else {
            this.setState({ isLoadig2: true }, () => {
                Axios.get("http://localhost:8080/thrifting/welcome/getsalebysize/" + this.state.selectedSize).then((response) => {
                    this.setState({
                        sales: response.data,
                        isLoadig2: false
                    })
                })
            })
        }
    }
    onChangePrice = async (e) => {
        await this.setState({
            selectedPrice: e.target.value
        })
        if (this.state.selectedPrice === "0") {
            this.setState({ isLoadig2: true }, () => {
                Axios.get("http://localhost:8080/thrifting/welcome/getsales/").then((response) => {
                    this.setState({
                        sales: response.data,
                        isLoadig2: false
                    })
                })
            })
        } else {
            this.setState({ isLoadig2: true }, () => {
                Axios.get("http://localhost:8080/thrifting/welcome/getsalebyprice/" + this.state.selectedPrice).then((response) => {
                    this.setState({
                        sales: response.data,
                        isLoadig2: false
                    })
                })
            })
        }
    }
    reload = () => {
        this.setState({ isLoadig: true }, () => {
            Axios.get("http://localhost:8080/thrifting/welcome/getsales/").then((response) => {
                this.setState({
                    sales: response.data,
                    isLoadig: false,
                    isLoadig2: false,
                    currentUser: AuthService.getCurrentUser(),
                })
            })
        })
    }

    render() {

        return (
            this.state.isLoadig ? <div className="loading"></div> :
                <>
                    <div className="homeheader ">
                        <div className="firstrowofheader">
                            <div id="header">
                                <h2 style={{ textAlign: "center", color: "whitesmoke" }}>
                                    THRIFTING GR
                                   {this.state.currentUser.roles[0] === "ROLE_ADMIN" && (
                                        <div>ADMIN_MODE</div>
                                    )}
                                </h2>
                            </div>

                        </div>
                        <nav className="homenavbar">

                            <ul>
                                <li><button onClick={this.womenAxios}>Women</button></li>
                                <li><button onClick={this.menAxios}>Men</button></li>
                                <li><button onClick={this.kidAxios}>Kids</button></li>
                                <li><button onClick={this.uniAxios}>Uni</button></li>
                                <li><button onClick={this.allAxios}>All</button></li>
                            </ul>

                        </nav>



                    </div>
                    <div className="flexcontainer">
                        <div className="searchoptions">
                            <p><strong>Filters:</strong></p>
                            <br></br>
                            <br></br>

                            <select value={this.state.selectedCategory}
                                onChange={this.onChangeCategory}>
                                <option value={0} >Choose Category</option>
                                {this.state.categories.map((category) => <option key={category.categoryid} value={category.categoryid}>{category.category}</option>)}
                            </select>
                            <br></br>
                            <select value={this.state.selectedSize}
                                onChange={this.onChangeSize}>
                                <option value={0} >Choose Size</option>
                                {this.state.filteredSizes.map((size) => <option key={size.sizeid} value={size.sizeid}>{size.size}</option>)}
                            </select>
                            <br></br>
                            <select value={this.state.selectedPrice}
                                onChange={this.onChangePrice}>
                                <option value={0} >Choose Price</option>
                                <option value={10} >Under 10€</option>
                                <option value={25} >Under 25€</option>
                                <option value={50} >Under 50€</option>
                                <option value={100} >Under 100€</option>
                            </select>
                            <br></br>

                        </div>
                        <div className="MainPageCotainer">
                            {this.state.isLoadig2 ? <div className="loading"></div> :
                                <div className="scroll">
                                    {this.state.sales.length === 0 && (

                                        <p className="emptybox"><strong>No Sales Found!</strong></p>
                                    )}
                                    {this.state.sales.map((sale) => {
                                        return <Sale key={sale.saleid} reloadfunction={this.reload} mysale={sale} userRole={this.state.currentUser.roles[0]} currentUserPosition={this.state.currentUserPosition}></Sale>
                                    })}
                                </div>
                            }
                        </div>
                    </div>
                </>
        );
    }
}


