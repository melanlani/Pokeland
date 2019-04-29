import axios from 'axios';
import { baseUrl } from './api';

export const loginUser = (email, password) => {
  return {
    type: 'LOGIN_USER',
    payload: axios.post(`${baseUrl}/api/v1/login/`, {
        'email': email,
        'password': password
    })
  }
  console.error(payload.data);
}

export const registerUser = (username, email, password,fileName) => {
  const config = { headers:
      { 'content-disposition': 'form-data; name="foto"; filename=fileName',
        'content-type': 'image/jpeg' } }
  return {
    type: 'REGISTER_USER',

    payload: axios.post(`${baseUrl}/api/v1/register/`, {
      'username': username,
      'email': email,
      'password': password,
    })

  }

}

export const getUserData = (token) => {
  return {
    type: 'GET_USER',
    payload: axios.get(`${baseUrl}/api/v1/user/data`, {
        headers: {
            Authorization: token
        }
    })
  }
}
export const dropUser = () => {
  return {
      type: 'DROP_USER'
  }
}
