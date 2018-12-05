import axios from 'axios'

// action types
const SET_BALANCE = 'SET_BALANCE'

// action creators
const setBalance = balance => {
  return {
    type: SET_BALANCE,
    balance,
  }
}

// thunk creators
export const fetchBalance = () => {
  return async dispatch => {
    try {
      const { data: balance } = await axios.get('/api/balance')
      console.log('balance: ', balance)
      dispatch(setBalance(balance))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateBalance = purchaseValue => {
  return async dispatch => {
    try {
      const { data: newBalance } = await axios.put('/api/balance', {
        purchaseValue,
      })
      dispatch(setBalance(newBalance))
    } catch (error) {
      console.error(error)
    }
  }
}

//reducer
const initialState = {
  amount: '',
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BALANCE:
      return {
        amount: action.balance,
      }
    default:
      return state
  }
}

export default reducer
