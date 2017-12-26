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
    'fill-opacity': 0.4,
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

export const selectedZoneLayer = (id, color = '#eee') => fromJS({
  id: '' + id,
  source: 'zones',
  type: 'fill',
  // interactive: true,
  paint: {
    'fill-color': color,
    'fill-opacity': 0.8
  },
  filter: ['in', 'OBJECTID', id]
})
