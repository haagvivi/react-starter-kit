import path from 'path'
import { Server } from 'http'
import Express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { useRouterHistory, match, RouterContext } from 'react-router'
import createRoutes from 'config/routes'
import { checkAuth } from 'helpers/helpers'
import { Provider } from 'react-redux'
import { createMemoryHistory, useQueries } from 'history'
import configureStore from 'store/configureStore'

// initialize the server and configure support for ejs templates
const app = new Express()
const server = new Server(app)
// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, '../..', 'build')))
app.use(Express.static(path.join(__dirname, '../', 'static')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../', 'views'))

// universal routing and rendering
app.get('*', (req, res) => {
  let history = useRouterHistory(useQueries(createMemoryHistory))();
  let store = configureStore()
  let routes = createRoutes(checkAuth, history)
  let location = history.createLocation(req.url);

  match(
    { routes, location},
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message)
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      }

      // generate the React markup for the current route
      let html
      // let reduxState = escape(JSON.stringify(store.getState()))
      let reduxState = escape(JSON.stringify(store.getState()))
      if (renderProps) {
        // if the current route matched we have renderProps
        html = renderToString(
          <Provider store={store}>
            { <RouterContext {...renderProps}/> }
          </Provider>
        )
      } else {
        // otherwise we can render a 404 page
        // html = renderToString(<NotFoundPage/>)
        res.status(404)
      }

      // render the index template with the embedded React html
      return res.render('index', { html, reduxState })
    }
  )
})

// start the server
const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'production'
server.listen(port, err => {
  if (err) {
    return console.error(err)
  }
  console.info(`Server running on http://localhost:${port} [${env}]`)
})
