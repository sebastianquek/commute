import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, array, object } from '@storybook/addon-knobs'
import ZoneDataContainer from './index'
import ThemeProviderDecorator from '../../ThemeProviderDecorator'

storiesOf('Zone data container', module)
  .addDecorator(withKnobs)
  .addDecorator(ThemeProviderDecorator)
  .add('Hovered zone data container', () =>
    <ZoneDataContainer zoneName="Toa Payoh West" dottedBorder>
    </ZoneDataContainer>
  )
  .add('Selected zone data container', () =>
    <ZoneDataContainer zoneName="National University Of S'pore" zoneColor="#ADADAD" zoneNum={1}>
    </ZoneDataContainer>
  )
