import { storeData } from '../actions/storage';
const initialState = {
  user: {},
  access_token: {},
  loggedIn: false,
  pending: false,
}

export default accounts = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_PENDING':
      return {
        user: {},
        access_token: {},
        loggedIn: true,
        pending: true
      }
    case 'LOGIN_USER_FULFILLED':
      const { token, type } = action.payload.data.access_token
      storeData('token', JSON.stringify(type + ' ' + token))
      return {
        ...state,
        access_token: action.payload.data.access_token,
        user: action.payload.data.user,
        loggedIn: true,
        pending: false
      }

    case 'REGISTER_USER_PENDING':
      return {
        ...state,
        pending: true
      }
    case 'REGISTER_USER_FULFILLED':
    storeData('token', JSON.stringify(action.payload.data.access_token.type + ' ' + action.payload.data.access_token.token))
    return {
      ...state,
      access_token: action.payload.data.access_token,
      user: action.payload.data.user,
      loggedIn: true,
      pending: false
    }
    case 'GET_USER_FULFILLED':
      return {
        ...state,
        user: action.payload.data.user,
        pending: true,
      }

    case 'DROP_USER':
      return {
        user: {},
        access_token: {},
        loggedIn: false,
        pending: false,
      }

    default:
      return state;
  }
}
