import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './rootReducer'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { configureAnchors } from 'react-scrollable-anchor'
import theme from './utils/theme'
import { ZoneManagerContainer } from './modules/zone-manager'
import { MapContainer } from './modules/map/index'
import ZoneDataContainer from './modules/zone-data/containers/ZoneDataContainer'

const middleware = []
middleware.push(thunkMiddleware)

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)

injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }
`

configureAnchors({offset: -30})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <div>
        <ZoneManagerContainer />
        <MapContainer />
        <ZoneDataContainer />
      </div>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
