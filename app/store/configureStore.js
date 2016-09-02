import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'

export default function configureStore (initialState) {
  const store = createStore(combineReducers({...reducers, routing: routerReducer}), initialState, compose(
    applyMiddleware(thunk)
  ))

  return store
}
