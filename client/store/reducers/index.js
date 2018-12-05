import { combineReducers } from 'redux'
import balance from './balance'
import user from './user'
import stock from './stock'

const reducer = combineReducers({
  balance,
  user,
  stock,
})

export default reducer
