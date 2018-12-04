import axios from 'axios'

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
  console.log('stockData', stockData)
  return async dispatch => {
    //I need ticker and quantity for stock
    //I need ticker, quantity, price and purchase type for transaction
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
        portfolio: [...state.portfolio, action.stockData],
      }
    default:
      return state
  }
}

export default reducer
