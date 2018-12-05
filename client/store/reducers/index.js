import { combineReducers } from 'redux'
import balance from './balance'
import user from './user'
import stock from './stock'
import trade from './trade'

const reducer = combineReducers({
  balance,
  user,
  stock,
  trade,
})

export default reducer
