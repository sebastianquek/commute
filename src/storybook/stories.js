import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, array, object } from '@storybook/addon-knobs'
import { injectGlobal } from 'styled-components'
import ThemeProviderDecorator from './ThemeProviderDecorator'

import ZoneButton from '../modules/core/components/ZoneButton'
import AddZoneButton from '../modules/zone-manager/components/AddZoneButton'
import SelectedZoneButton from '../modules/zone-manager/components/SelectedZoneButton'

import ZoneDataList from '../modules/zone-data/components/ZoneDataList'
import ZoneDataContainer from '../modules/zone-data/components/ZoneDataContainer'

import ZoneManager from '../modules/zone-manager/components/ZoneManager'

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
  .addDecorator(withKnobs)
  .addDecorator(ThemeProviderDecorator)
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
  .addDecorator(withKnobs)
  .addDecorator(ThemeProviderDecorator)
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
  .addDecorator(withKnobs)
  .addDecorator(ThemeProviderDecorator)
  .add('No zone selected', () => {
    return <ZoneManager />
  })
  .add('2 origin zones selected', () => {
    return (
      <ZoneManager
        originZones={
          <div>
            <SelectedZoneButton>1</SelectedZoneButton>
            <SelectedZoneButton>2</SelectedZoneButton>
          </div>
        } />
    )
  })
