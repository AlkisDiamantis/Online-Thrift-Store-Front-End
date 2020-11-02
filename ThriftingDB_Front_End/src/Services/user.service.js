import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/thrifting/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  adminDeleteuser(userid) {
    return axios.get(API_URL + "deleteUser/"+userid, { headers: authHeader() });
  }
}



export default new UserService();