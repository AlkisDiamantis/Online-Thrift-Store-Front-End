import axios from "axios";

const API_URL = "http://localhost:8080/thrifting/welcome/";

class AuthService {

    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password,

            })
            .then(response => {
             
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));

                }


                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

     getCurrentUser() {
        return   JSON.parse(localStorage.getItem('user'));
    }

    getUser(id) {

        return axios.post(API_URL + "getUser", {
            id,
        })
            .then(response => {

                return response.data;
            });
    }
}

export default new AuthService();