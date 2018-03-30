import { combineReducers } from 'redux'
import * as t from './actionTypes'
import linkingCoordinator from '../linking-coordinator'
import zoneManager from '../zone-manager'
import { fromJS } from 'immutable'
import {
  defaultMapStyle, zonesHoverLayer, zonesSelectionLayer, selectedGroupLayer,
  journeysLayer, journeysHoverLayer, flowArrowsLayer, subgraphGroupLayer
} from './map-style'

// Add a selection layer (layer that outlines selectable zones) or
// edit the current selection layer's color
function addOrEditSelectionLayer (state, color = 'black') {
  let idx = state.get('layers').findIndex(layer => layer.get('id') === 'zonesSelection')
  if (idx !== -1) {
    return state.setIn(['layers', idx, 'paint', 'fill-outline-color'], color)
  } else {
    const layer = zonesSelectionLayer.setIn(['paint', 'fill-outline-color'], color)
    return insertBeforeHoverLayerIfExists(state, layer)
  }
}

// Ensure that the input layer is below the hover layer
// The hover layer should be the topmost layer to detect mouse events
function insertBeforeHoverLayerIfExists (state, layer) {
  let hoverLayerIdx = state.get('layers').findIndex(item =>
    item.get('id') === zonesHoverLayer.get('id')
  )
  if (hoverLayerIdx !== -1) {
    return state.update('layers', layers => layers.insert(hoverLayerIdx - 1, layer))
  }
  return state.update('layers', layers => layers.push(layer))
}

function mapStyle (state = defaultMapStyle, action) {
  switch (action.type) {
    case t.ADD_ZONE_COMPOSITION:
      return state.setIn(['sources', 'zones'], fromJS({type: 'geojson', data: action.zones}))

    case t.ADD_JOURNEYS:
      let newState = state.setIn(['sources', 'journeys'], fromJS({type: 'geojson', data: action.journeys}))
      let idx = state.get('layers').findIndex(item =>
        item.get('id') === journeysLayer.get('id')
      )
      if (idx === -1) { // Journeys layer has not been added
        newState = newState.update('layers', layers => layers.push(journeysLayer))
          .update('layers', layers => layers.push(flowArrowsLayer))
      }
      return newState

    case t.SET_FILTERED_ROUTE_IDS:
      idx = state.get('layers').findIndex(item => item.get('id') === journeysLayer.get('id'))
      let arrowLayerIdx = state.get('layers').findIndex(item => item.get('id') === flowArrowsLayer.get('id'))
      if (idx !== -1) {
        return state.setIn(['layers', idx, 'filter'], ['in', 'id', ...action.filteredRouteIds])
          .setIn(['layers', arrowLayerIdx, 'filter'], ['in', 'id', ...action.filteredRouteIds])
      }
      return state

    case t.REMOVE_JOURNEYS:
      if (state.getIn(['sources', 'journeys', 'data', 'features']).size === 0) {
        return state
      }
      return state.setIn(['sources', 'journeys', 'data', 'features'], fromJS([]))

    case t.HOVER_OVER_ZONE:
      idx = state.get('layers').findIndex(item =>
        item.get('id') === zonesHoverLayer.get('id')
      )
      if (idx !== -1) {
        return state.updateIn(['layers', idx, 'filter'], filter => filter.set(2, action.zoneId))
      } else {
        const layer = zonesHoverLayer.update('filter', filter => filter.set(2, action.zoneId))
        return state.update('layers', layers => layers.push(layer))
      }

    case zoneManager.actionTypes.SET_ORIGIN_SELECTION_MODE:
      return addOrEditSelectionLayer(state, 'blue')

    case zoneManager.actionTypes.SET_DESTINATION_SELECTION_MODE:
      return addOrEditSelectionLayer(state, 'orange')

    case zoneManager.actionTypes.SET_EDIT_SELECTION_MODE:
      return addOrEditSelectionLayer(state, 'black')

    case zoneManager.actionTypes.RESET_SELECTION_MODE:
      newState = state.update('layers', layers =>
        layers.filterNot(layer => layer.get('id') === 'zonesSelection')
      )
      idx = newState.get('layers').findIndex(item =>
        item.get('id') === zonesHoverLayer.get('id')
      )
      if (idx !== -1) {
        return newState.updateIn(['layers', idx, 'filter'], filter => filter.delete(2))
      }
      return newState

    case t.COLOR_SELECTED_GROUPS:
      return action.groups.reduce((newState, g) => {
        return newState.update('layers', layers =>
          layers.push(selectedGroupLayer(g.groupId, g.color, g.zoneIds))
        )
      }, state)

    case t.COLOR_SUBGRAPH_GROUPS:
      return action.groups.reduce((newState, g) => {
        return newState.update('layers', layers =>
          layers.push(subgraphGroupLayer(g.groupId, g.color, g.zoneIds))
        )
      }, state)

    case zoneManager.actionTypes.ADD_GROUP:
      if (state.get('layers').findIndex(layer => layer.get('id') === '' + action.groupId) === -1) {
        idx = state.get('layers').findIndex(i => i.get('id') === journeysLayer.get('id'))
        return state.update('layers', layers =>
          layers.insert(idx - 1, selectedGroupLayer(action.groupId, action.color))
        )
      }
      return state

    case zoneManager.actionTypes.REMOVE_GROUP:
      return state.update('layers', layers =>
        layers.filterNot(l =>
          l.get('id') === '' + action.groupId
        )
      )

    case zoneManager.actionTypes.ADD_ZONE_TO_GROUP:
      idx = state.get('layers').findIndex(item => item.get('id') === '' + action.groupId)
      if (idx !== -1) {
        return state.updateIn(['layers', idx, 'filter'], filter => filter.push(action.zoneId))
      }
      return state

    case zoneManager.actionTypes.REMOVE_ZONE_FROM_GROUP:
      idx = state.get('layers').findIndex(item => item.get('id') === '' + action.groupId)
      if (idx !== -1) {
        return state.updateIn(['layers', idx, 'filter'], filter =>
          filter.filterNot(id => id === action.zoneId)
        )
      }
      return state

    case zoneManager.actionTypes.ADD_SUBGRAPH_GROUP:
      if (state.get('layers').findIndex(layer => layer.get('id') === 'subgraph-' + action.groupId) === -1) {
        idx = state.get('layers').findIndex(i => i.get('id') === journeysLayer.get('id'))
        return state.update('layers', layers =>
          layers.insert(idx - 1, subgraphGroupLayer(action.groupId, action.color, action.zoneIds))
        )
      }
      return state

    case zoneManager.actionTypes.REMOVE_SUBGRAPH_GROUP:
      return state.update('layers', layers =>
        layers.filterNot(l =>
          l.get('id') === 'subgraph-' + action.groupId
        )
      )

    case zoneManager.actionTypes.HIDE_SUBGRAPH_GROUP:
      idx = state.get('layers').findIndex(layer => layer.get('id') === 'subgraph-' + action.groupId)
      if (idx !== -1) {
        return state.setIn(['layers', idx, 'paint', 'line-opacity'], 0)
      }
      return state

    case zoneManager.actionTypes.SHOW_SUBGRAPH_GROUP:
      idx = state.get('layers').findIndex(layer => layer.get('id') === 'subgraph-' + action.groupId)
      if (idx !== -1) {
        return state.setIn(['layers', idx, 'paint', 'line-opacity'], 0.8)
      }
      return state

    case linkingCoordinator.actionTypes.SET_HOVERED_ROUTE_ID:
      let hoverLayerIdx = state.get('layers').findIndex(item =>
        item.get('id') === journeysHoverLayer.get('id')
      )
      let journeysLayerIdx = state.get('layers').findIndex(item =>
        item.get('id') === journeysLayer.get('id')
      )

      if (journeysLayerIdx !== -1) {
        // Add/update journeys hover layer
        if (hoverLayerIdx === -1) { // Journeys hover layer has not been added
          const layer = journeysHoverLayer.update('filter', f => f.set(2, action.routeId))
          newState = state.update('layers', layers => layers.insert(journeysLayerIdx + 1, layer))
        } else {
          newState = state.updateIn(['layers', hoverLayerIdx, 'filter'], f => f.set(2, action.routeId))
        }
        // Make flows thinner
        newState = newState.setIn(['layers', journeysLayerIdx, 'paint', 'line-width', 'base'], 6)
        return newState
      }
      return state

    case linkingCoordinator.actionTypes.CLEAR_HOVERED_ROUTE_ID:
      hoverLayerIdx = state.get('layers').findIndex(item =>
        item.get('id') === journeysHoverLayer.get('id')
      )
      journeysLayerIdx = state.get('layers').findIndex(item =>
        item.get('id') === journeysLayer.get('id')
      )

      if (journeysLayerIdx !== -1) {
        // Go back to default flow thickness
        newState = state.setIn(['layers', journeysLayerIdx, 'paint', 'line-width', 'base'], 1)
        if (hoverLayerIdx !== -1) {
          newState = newState.updateIn(['layers', hoverLayerIdx, 'filter'], f => f.delete(2))
        }
        return newState
      }
      return state

    default:
      return state
  }
}

const currentZone = (state = {
  id: null,
  isSelected: false
}, action) => {
  switch (action.type) {
    case t.HOVER_OVER_ZONE:
      if (!state.isSelected) {
        return {...state, id: action.zoneId}
      }
      return state
    case t.TOGGLE_LOCK_HOVERED_ZONE:
      return {...state, isSelected: !state.isSelected}
    case t.RESET_LOCK_HOVERED_ZONE:
      return {...state, isSelected: false}
    default:
      return state
  }
}

export default combineReducers({
  mapStyle,
  currentZone
})
