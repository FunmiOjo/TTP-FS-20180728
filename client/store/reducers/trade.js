import axios from 'axios'

// action types
const SET_ADDED_TRADE = 'SET_ADDED_TRADE'

// action creators
const setAddedTrade = trade => {
  return {
    type: SET_ADDED_TRADE,
    trade,
  }
}

// thunk creators
export const addTrade = trade => {
  return async dispatch => {
    try {
      const { data: addedTrade } = await axios.post('/api/trades', trade)
      dispatch(setAddedTrade(addedTrade))
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer
const initialState = {
  trades: [],
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDED_TRADE:
      return {
        ...state,
        trades: [...state.trades, action.trade],
      }
    default:
      return state
  }
}

export default reducer
