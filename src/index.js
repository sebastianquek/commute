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
import { MapContainer } from './modules/map'
import { ZoneDataList } from './modules/zone-data'
import { DatetimeManager } from './modules/datetime-manager'

const middleware = []
middleware.push(thunkMiddleware)

if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger())
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)

injectGlobal`
  * {
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-kerning: auto;
  }

  html {
    font-family: 'Poppins', sans-serif;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    padding: 0;
  }
`

configureAnchors({offset: -60})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <div>
        <ZoneManagerContainer />
        <MapContainer />
        <DatetimeManager />
        <ZoneDataList />
      </div>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
