import axios from 'axios'

// action types
const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'
const SET_SIGN_UP_ERROR = 'SET_SIGN_UP_ERROR'
const CLEAR_LOGGED_OUT_USER = 'CLEAR_LOGGED_OUT_USER'

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

const clearLoggedOutUser = () => {
  return {
    type: CLEAR_LOGGED_OUT_USER,
  }
}

// thunk creators
export const signUpUser = signUpInfo => {
  return async dispatch => {
    try {
      const { data: user } = await axios.post('/auth/signup', signUpInfo)
      dispatch(setLoggedInUser(user))
    } catch (error) {
      console.error(error)
      dispatch(setSignUpError(error))
    }
  }
}

export const logInUser = userInfo => {
  return async dispatch => {
    try {
      const { data: user } = await axios.put('/auth/login', userInfo)
      if (user.id) {
        dispatch(setLoggedInUser(user))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchLoggedInUser = () => {
  return async dispatch => {
    try {
      const { data: user } = await axios.get('/auth/me')
      if (user.id) {
        dispatch(setLoggedInUser(user))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const logOutUser = () => {
  return async dispatch => {
    try {
      await axios.delete('/auth/logout')
      dispatch(clearLoggedOutUser())
    } catch (error) {
      console.error(error)
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
    case SET_SIGN_UP_ERROR:
      return {
        ...state,
        signUpError: action.error,
      }
    default:
      return state
  }
}

export default reducer
