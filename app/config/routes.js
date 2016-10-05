import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { MainContainer, HomeContainer } from 'containers'
import { NotFound } from 'components'

const getRoutes = (checkAuth, history) => (
  <Router history={history}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={HomeContainer} onEnter={checkAuth} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)

export default getRoutes
