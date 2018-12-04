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
export const addPurchasedStock = (ticker, quantity) => {
  return async dispatch => {}
}
