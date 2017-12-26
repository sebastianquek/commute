import {fromJS} from 'immutable'
import MAP_STYLE from './style.json'

export const defaultMapStyle = fromJS(MAP_STYLE)

export const zonesLayer = fromJS({
  id: 'zones',
  source: 'zones',
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': 'rgba(0, 0, 0, 0)',
    'fill-opacity': 0.5,
    'fill-outline-color': '#fff'
  }
})

export const zonesHoverLayer = fromJS({
  id: 'zonesHover',
  source: 'zones',
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': '#fff',
    'fill-opacity': 0.8,
    'fill-outline-color': '#fff'
  },
  filter: ['in', 'OBJECTID', '']
})
