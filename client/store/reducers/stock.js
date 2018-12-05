import axios from 'axios'
import { getNewVersionOfStateWithAddedStock } from '../utils'

// action types
const SET_ADDED_PURCHASED_STOCK = 'SET_ADDED_PURCHASED_STOCK'

// action creators
const setAddedPurchasedStock = stockData => {
  return {
    type: SET_ADDED_PURCHASED_STOCK,
    stockData,
  }
}

// thunk creators
export const addPurchasedStock = stockData => {
  return async dispatch => {
    try {
      const { data: addedStock } = await axios.post('/api/stocks', stockData)
      dispatch(setAddedPurchasedStock(addedStock))
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer
const initialState = {
  portfolio: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDED_PURCHASED_STOCK:
      return {
        ...state,
        portfolio: getNewVersionOfStateWithAddedStock(
          action.stockData,
          state.portfolio
        ),
      }
    default:
      return state
  }
}

export default reducer
