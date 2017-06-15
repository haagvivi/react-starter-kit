import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from 'config/routes'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import configureStore from 'store/configureStore'
import Immutable from 'immutable'
import _ from 'lodash'
import { checkAuth } from 'helpers/helpers'
import styles from 'styles/main.scss'

let reduxState = {}
if (window.__REDUX_STATE__) {
  try {
    let plain = JSON.parse(unescape(__REDUX_STATE__))
    _.each(plain, (val, key) => {
      reduxState[key] = Immutable.fromJS(val)
    })
  } catch (e) {
  }
}

const store = configureStore(reduxState)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth, history)}
  </Provider>,
  document.getElementById('app')
)
