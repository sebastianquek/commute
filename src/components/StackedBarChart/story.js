import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, array, object } from '@storybook/addon-knobs'
import BarChart from './index'

storiesOf('BarChart', module)
  .addDecorator(withKnobs)
  .add('with data', () => {
    const data = {
      label: 'data',
      default: [
        {day: 'Mon', apricots: 120, blueberries: 180, cherries: 100},
        {day: 'Tue', apricots: 60, blueberries: 185, cherries: 105},
        {day: 'Wed', apricots: 100, blueberries: 215, cherries: 110},
        {day: 'Thu', apricots: 80, blueberries: 230, cherries: 105},
        {day: 'Fri', apricots: 120, blueberries: 240, cherries: 105}
      ]
    }

    const colors = {
      label: 'colors',
      default: ['#FBB65B', '#513551', '#de3163']
    }

    const keys = {
      label: 'keys',
      default: ['apricots', 'blueberries', 'cherries']
    }

    return <BarChart
      data={object(data.label, data.default)}
      colors={array(colors.label, colors.default)}
      keys={array(keys.label, keys.default)}
    />
  })
