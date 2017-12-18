import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, array, object } from '@storybook/addon-knobs'
import RightSidebar from './index'
import ZoneDataContainer from '../ZoneDataContainer'
import ThemeProviderDecorator from '../../ThemeProviderDecorator'

storiesOf('Right sidebar', module)
  .addDecorator(withKnobs)
  .addDecorator(ThemeProviderDecorator)
  .add('No zone selected', () =>
    <RightSidebar
    />
  )
  .add('1 hovered zone', () =>
    <RightSidebar
      hoveredZoneData={
        <ZoneDataContainer zoneName="Toa Payoh West" dottedBorder>
        </ZoneDataContainer>
      }
    />
  )
  .add('2 origin zones selected', () =>
    <RightSidebar
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
