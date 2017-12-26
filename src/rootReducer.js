import {combineReducers} from 'redux'
import zoneManager from './modules/zone-manager'
import zoneData from './modules/zone-data'
import map from './modules/map'

export default combineReducers({
  zoneManager: zoneManager.reducer,
  zoneData: zoneData.reducer,
  mapStyle: map.reducer
})
