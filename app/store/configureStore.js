import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'

const configureStore = (initialState) => {
  const store = createStore(combineReducers({...reducers, routing: routerReducer}), initialState, compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ))

  return store
}

export default configureStore
