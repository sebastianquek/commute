import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, array, object } from '@storybook/addon-knobs'
import { injectGlobal } from 'styled-components'
import ThemeProviderDecorator from './ThemeProviderDecorator'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../rootReducer'

import ZoneButton from '../modules/core/components/ZoneButton'
import AddZoneButton from '../modules/zone-manager/components/AddZoneButton'
import SelectedZoneButton from '../modules/zone-manager/components/SelectedZoneButton'

import ZoneDataList from '../modules/zone-data/components/ZoneDataList'
import ZoneDataContainer from '../modules/zone-data/components/ZoneDataContainer'

import {ZoneManagerContainer} from '../modules/zone-manager'

const middleware = []
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)

const ReduxProviderDecorator = (storyFn) => (
  <Provider store={store}>
    {storyFn()}
  </Provider>
)

addDecorator(withKnobs)
addDecorator(ReduxProviderDecorator)
addDecorator(ThemeProviderDecorator)

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Poppins');

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }
`

storiesOf('Zone buttons', module)
  .add('Base zone button', () => {
    return <ZoneButton>10</ZoneButton>
  })
  .add('Button for selected zones', () => {
    return <SelectedZoneButton>9</SelectedZoneButton>
  })
  .add('Add zone button', () => {
    return <AddZoneButton />
  })

storiesOf('Zone data list', module)
  .add('No zone selected', () =>
    <ZoneDataList
    />
  )
  .add('1 hovered zone', () =>
    <ZoneDataList
      hoveredZoneData={
        <ZoneDataContainer zoneName="Toa Payoh West" dottedBorder>
        </ZoneDataContainer>
      }
    />
  )
  .add('2 origin zones selected', () =>
    <ZoneDataList
      hoveredZoneData={
        <ZoneDataContainer zoneName="Toa Payoh West" dottedBorder>
        </ZoneDataContainer>
      }
      originZonesData={[
        <ZoneDataContainer key="National University Of S'pore" zoneName="National University Of S'pore" zoneColor="#ADADAD" zoneNum={1}>
        </ZoneDataContainer>,
        <ZoneDataContainer key="Kent Ridge" zoneName="Kent Ridge" zoneColor="#C4C4C4" zoneNum={2}>
        </ZoneDataContainer>
      ]}
    />
  )

storiesOf('Zone manager', module)
  .add('base', () => {
    return <ZoneManagerContainer />
  })
