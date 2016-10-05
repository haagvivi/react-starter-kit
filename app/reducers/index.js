import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as reducers from 'redux/modules'

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

export default rootReducer
