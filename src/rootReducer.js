import {combineReducers} from 'redux'
import zoneManager from './modules/zone-manager'
import zoneData from './modules/zone-data'
import map from './modules/map'
import datetimeManager from './modules/datetime-manager'

export default combineReducers({
  zoneManager: zoneManager.reducer,
  zoneData: zoneData.reducer,
  map: map.reducer,
  datetimeBrushDomain: datetimeManager.reducer.datetimeBrushDomain,
  ridershipData: datetimeManager.reducer.ridershipData
})
