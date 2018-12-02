import axios from 'axios'

// action types
const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'
const SET_SIGN_UP_ERROR = 'SET_SIGN_UP_ERROR'

// action creators
const setLoggedInUser = user => {
  return {
    type: SET_LOGGED_IN_USER,
    user,
  }
}

const setSignUpError = error => {
  return {
    type: SET_SIGN_UP_ERROR,
    error,
  }
}

// thunk creators
export const signUpUser = signUpInfo => {
  return async dispatch => {
    try {
      const user = await axios.post('/auth/signup', signUpInfo)
      dispatch(setLoggedInUser(user))
    } catch (error) {
      console.error(error)
      dispatch(setSignUpError(error))
    }
  }
}

// reducer
const initialState = {
  loggedInUser: {},
  signUpError: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.user,
      }
    case SET_SIGNUP_ERROR:
      return {
        ...state,
        signUpError: action.error,
      }
    default:
      return state
  }
}

export default reducer
