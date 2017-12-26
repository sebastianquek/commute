import * as t from './actionTypes'
import {fromJS} from 'immutable'
import { defaultMapStyle, zonesLayer, zonesHoverLayer } from './map-style'

function mapStyle (state = defaultMapStyle, action) {
  switch (action.type) {
    case t.RECEIVE_ZONES:
      return state.setIn(['sources', 'zones'], fromJS({type: 'geojson', data: action.zones}))
        .update('layers', layers => layers.push(zonesLayer))

    case t.HOVER_OVER_ZONE:
      let newState
      if (state.get('layers').contains(zonesHoverLayer)) {
        let idx = state.get('layers').findIndex(item =>
          item.get('id') === zonesHoverLayer.get('id')
        )
        newState = state.updateIn(['layers', idx, 'filter'], filter => {
          filter.set(2, action.zoneId)
        })
      } else {
        const layer = zonesHoverLayer.update('filter', filter => filter.push(action.zoneId))
        newState = state.update('layers', layers => layers.push(layer))
      }
      return newState
      
    default:
      return state
  }
}

export default mapStyle
