import React from 'react';
import AuthService from "../Services/auth.service";
import Axios from "axios";
import Messages from "./MessageComponent"
import authHeader from "../Services/auth-header"

export default class MessagePage extends React.Component {

    constructor() {
        super();
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            messages: [],
            isLoadig: true,
        }
    }

    componentDidMount() {
        this.setState({ isLoadig: true }, () => {
            Axios.get("http://localhost:8080/thrifting/welcome/getMessageByuserReceiveid/" + this.state.currentUser.id,{headers: authHeader()}).then(async (response) => {
                await this.setState({
                    messages: response.data,
                    isLoadig: false
                })

            })
        })
    }

    reloadPage = () => {
        Axios.get("http://localhost:8080/thrifting/welcome/getMessageByuserReceiveid/" + this.state.currentUser.id,{headers: authHeader()}).then(async (response) => {
            await this.setState({
                messages: response.data
            })

        })
    }
    render() {
        return (
            // this.state.isLoadig ? <div className="loading"></div> :
            <>
                <h1>  &#xf0e0; Inbox</h1>
                <div className="MainPageCotainer" >
                <div className="inbox"></div>
                    <div >
                        {this.state.messages.map(msg => {
                            return (
                                <Messages key={msg.idMessages} mymsg={msg} reloadPage={this.reloadPage}></Messages>
                            )
                        })}
                    </div>
                    <div>
                        {this.state.messages.length === 0 && (

                            <p className="emptybox2"><strong>Empty Indox &#xf119;</strong></p>
                        )}
                    </div>
                </div>

            </>

        )
    }
}