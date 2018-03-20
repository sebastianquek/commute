import { combineReducers } from 'redux'
import zoneManager from './modules/zone-manager'
import zoneData from './modules/zone-data'
import map from './modules/map'
import datetimeManager from './modules/datetime-manager'

export default combineReducers({
  zoneManager: zoneManager.reducer,
  zoneCompositionData: zoneData.reducer.zoneCompositionData,
  zoneJourneyData: zoneData.reducer.zoneJourneyData,
  zoneJourneyDataFilters: zoneData.reducer.zoneJourneyDataFilters,
  map: map.reducer,
  datetimeBrushDomain: datetimeManager.reducer.datetimeBrushDomain,
  datetimeZoomDomain: datetimeManager.reducer.datetimeZoomDomain,
  ridershipDomain: datetimeManager.reducer.ridershipDomain,
  ridershipData: datetimeManager.reducer.ridershipData,
  datetimeManagerInterfaceFlags: datetimeManager.reducer.datetimeManagerInterfaceFlags
})
