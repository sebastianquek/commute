import {fromJS} from 'immutable'
import MAP_STYLE from './style2.json'

export const defaultMapStyle = fromJS(MAP_STYLE)

export const zonesLayer = fromJS({
  id: 'zones',
  source: 'zones',
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': 'rgba(0, 0, 0, 0)',
    'fill-opacity': 0.4,
    'fill-outline-color': '#000'
  }
})

export const zonesHoverLayer = fromJS({
  id: 'zonesHover',
  source: 'zones',
  type: 'fill',
  interactive: true,
  paint: {
    'fill-color': '#000',
    'fill-opacity': 0.4,
    'fill-outline-color': '#000'
  },
  filter: ['in', 'OBJECTID', '']
})

export const zonesOriginSelectionLayer = fromJS({
  id: 'zonesOriginSelection',
  source: 'zones',
  type: 'fill',
  // interactive: true,
  paint: {
    'fill-color': 'rgba(0, 0, 0, 0)',
    'fill-opacity': 0.8,
    'fill-outline-color': 'blue'
  },
  filter: ['!in', 'OBJECTID', '']
})

export const zonesDestinationSelectionLayer = fromJS({
  id: 'zonesDestinationSelection',
  source: 'zones',
  type: 'fill',
  // interactive: true,
  paint: {
    'fill-color': 'rgba(0, 0, 0, 0)',
    'fill-opacity': 0.8,
    'fill-outline-color': 'orange'
  },
  filter: ['!in', 'OBJECTID', '']
})

export const selectedGroupLayer = (groupId, color = '#eee', zoneIds = []) => fromJS({
  id: '' + groupId,
  source: 'zones',
  type: 'fill',
  // interactive: true,
  paint: {
    'fill-color': color,
    'fill-opacity': 0.8
  },
  filter: ['in', 'OBJECTID', ...zoneIds]
})
