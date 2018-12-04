import { combineReducers } from 'redux'
import user from './user'
import stock from './stock'

const reducer = combineReducers({
  user,
  stock,
})

export default reducer
