import { combineReducers } from 'redux'
import * as t from './actionTypes'
import zoneManager from '../zone-manager'
import { fromJS } from 'immutable'
import { defaultMapStyle, zonesLayer, zonesHoverLayer, zonesOriginSelectionLayer, zonesDestinationSelectionLayer, selectedGroupLayer } from './map-style'

function mapStyle (state = defaultMapStyle, action) {
  switch (action.type) {
    case t.ADD_ZONE_COMPOSITION:
      return state.setIn(['sources', 'zones'], fromJS({type: 'geojson', data: action.zones}))
        .update('layers', layers => layers.push(zonesLayer))

    case t.HOVER_OVER_ZONE:
      let idx = state.get('layers').findIndex(item =>
        item.get('id') === zonesHoverLayer.get('id')
      )
      if (idx !== -1) {
        return state.updateIn(['layers', idx, 'filter'], filter => filter.set(2, action.zoneId))
      } else {
        const layer = zonesHoverLayer.update('filter', filter => filter.set(2, action.zoneId))
        return state.update('layers', layers => layers.push(layer))
      }

    case zoneManager.actionTypes.SET_ORIGIN_SELECTION_MODE:
      let newState = state.update('layers', layers => layers.filterNot(l => l === zonesDestinationSelectionLayer))
      if (!state.get('layers').contains(zonesOriginSelectionLayer)) {
        let idx = state.get('layers').findIndex(item =>
          item.get('id') === zonesHoverLayer.get('id')
        )
        newState = state.update('layers', layers => layers.insert(idx - 1, zonesOriginSelectionLayer))
      }
      return newState

    case zoneManager.actionTypes.SET_DESTINATION_SELECTION_MODE:
      newState = state.update('layers', layers => layers.filterNot(l => l === zonesOriginSelectionLayer))
      if (!state.get('layers').contains(zonesDestinationSelectionLayer)) {
        let idx = state.get('layers').findIndex(item =>
          item.get('id') === zonesHoverLayer.get('id')
        )
        newState = state.update('layers', layers => layers.insert(idx - 1, zonesDestinationSelectionLayer))
      }
      return newState

    case zoneManager.actionTypes.RESET_SELECTION_MODE:
      return state.update('layers', layers =>
        layers.filterNot(l => l === zonesOriginSelectionLayer || l === zonesDestinationSelectionLayer)
      )

    case t.COLOR_SELECTED_GROUPS:
      return action.groups.reduce((newState, g) => {
        return newState.update('layers', layers => layers.push(selectedGroupLayer(g.groupId, g.color, g.zoneIds)))
      }, state)

    case zoneManager.actionTypes.ADD_GROUP:
      if (state.get('layers').findIndex(layer => layer.get('id') === '' + action.groupId) === -1) {
        return state.update('layers', layers => layers.push(selectedGroupLayer(action.groupId, action.color)))
      }
      return state

    case zoneManager.actionTypes.REMOVE_GROUP:
      return state.update('layers', layers => layers.filterNot(l => l.get('id') === '' + action.groupId))

    case zoneManager.actionTypes.ADD_ZONE_TO_GROUP:
      idx = state.get('layers').findIndex(item => item.get('id') === '' + action.groupId)
      if (idx !== -1) {
        return state.updateIn(['layers', idx, 'filter'], filter => filter.push(action.zoneId))
      }
      return state

    case zoneManager.actionTypes.REMOVE_ZONE_FROM_GROUP:
      idx = state.get('layers').findIndex(item => item.get('id') === '' + action.groupId)
      if (idx !== -1) {
        return state.updateIn(['layers', idx, 'filter'], filter => filter.filterNot(id => id !== action.zoneId))
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
