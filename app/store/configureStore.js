import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'
import rootReducer from 'reducers'

const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ))

  if (module.hot) {
    console.log('hit')
    module.hot.accept('reducers', () => {
      console.log('hit inside')
      const nextRootReducer = require('reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
