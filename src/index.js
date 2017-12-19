import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import rootReducer from './rootReducer'
import ZoneManager from './modules/zone-manager'

const middleware = []
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)

ReactDOM.render(
  <Provider store={store}>
    <ZoneManager />
  </Provider>,
  document.getElementById('root')
)
