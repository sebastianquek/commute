import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, array, object } from '@storybook/addon-knobs'
import LeftSidebar from './index'
import SelectedZoneButton from '../SelectedZoneButton'
import ThemeProviderDecorator from '../../ThemeProviderDecorator'

storiesOf('Left sidebar', module)
  .addDecorator(withKnobs)
  .addDecorator(ThemeProviderDecorator)
  .add('No zone selected', () => {
    return <LeftSidebar />
  })
  .add('2 origin zones selected', () => {
    return (
      <LeftSidebar
        originZones={
          <div>
            <SelectedZoneButton>1</SelectedZoneButton>
            <SelectedZoneButton>2</SelectedZoneButton>
          </div>
        } />
    )
  })
