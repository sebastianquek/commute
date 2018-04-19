import {fromJS} from 'immutable'
import MAP_STYLE from './style4.json'

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
  filter: ['in', 'objectid', '']
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
  filter: ['!in', 'objectid', '']
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
  filter: ['in', 'objectid', ...zoneIds]
})

export const subgraphGroupLayer = (groupId, color = '#eee', zoneIds = []) => fromJS({
  id: 'subgraph-' + groupId,
  source: 'zones',
  type: 'line',
  interactive: true,
  paint: {
    'line-color': color,
    'line-opacity': 0.8,
    'line-width': {
      'base': 1,
      'stops': [
        [10, 1],
        [16, 5]
      ]
    }
  },
  filter: ['in', 'objectid', ...zoneIds]
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
        [10, 4],
        [16, 9]
      ]
    },
    'line-opacity': 0.35
  }
})

export const journeysHoverLayer = fromJS({
  id: 'journeysHover',
  source: 'journeys',
  type: 'line',
  interactive: false,
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#326299',
    'line-width': {
      'base': 0.1,
      'stops': [
        [10, 4],
        [16, 9]
      ]
    },
    'line-opacity': 1
  },
  filter: ['in', 'id', '']
})

export const flowArrowsLayer = fromJS({
  'id': 'arrow-layer',
  'type': 'symbol',
  'source': 'journeys',
  'layout': {
    'symbol-placement': 'line',
    'symbol-spacing': 200,
    // 'icon-allow-overlap': true,
    // 'icon-ignore-placement': true,
    'icon-image': 'arrow',
    'icon-size': {
      'base': 0.7,
      'stops': [
        [10, 0.08],
        [16, 0.2]
      ]
    },
    'visibility': 'visible'
  }
})
