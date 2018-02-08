import {fromJS} from 'immutable'
import MAP_STYLE from './style2.json'

export const defaultMapStyle = fromJS(MAP_STYLE)

export const zonesHoverLayer = fromJS({
  id: 'zonesHover',
  source: 'zones',
  type: 'fill',
  // interactive: true,
  paint: {
    'fill-color': '#000',
    'fill-opacity': 0.4,
    'fill-outline-color': '#000'
  },
  filter: ['in', 'OBJECTID', '']
})

export const zonesSelectionLayer = fromJS({
  id: 'zonesSelection',
  source: 'zones',
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': 'rgba(0, 0, 0, 0)',
    'fill-opacity': 0.8,
    'fill-outline-color': 'black'
  },
  filter: ['!in', 'OBJECTID', '']
})

export const selectedGroupLayer = (groupId, color = '#eee', zoneIds = []) => fromJS({
  id: '' + groupId,
  source: 'zones',
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': color,
    'fill-opacity': 0.8
  },
  filter: ['in', 'OBJECTID', ...zoneIds]
})

export const journeysLayer = fromJS({
  id: 'journeys',
  source: 'journeys',
  type: 'line',
  interactive: true,
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#4a90e2',
    'line-width': {
      'base': 1,
      'stops': [
        [10, 1],
        [16, 6]
      ]
    },
    'line-opacity': 0.4
  }
})
