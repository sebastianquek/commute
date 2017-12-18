import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, array, object } from '@storybook/addon-knobs'
import ZoneButton from './index'
import AddZoneButton from '../AddZoneButton'
import SelectedZoneButton from '../SelectedZoneButton'
import ThemeProviderDecorator from '../../ThemeProviderDecorator'

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
