import { combineReducers } from 'redux'
import zoneManager from './modules/zone-manager'
import zoneData from './modules/zone-data'
import map from './modules/map'
import datetimeManager from './modules/datetime-manager'
import linkingCoordinator from './modules/linking-coordinator'

export default combineReducers({
  zoneManager: zoneManager.reducer,
  zoneCompositionData: zoneData.reducer.zoneCompositionData,
  zoneJourneyData: zoneData.reducer.zoneJourneyData,
  routeChoicesFilters: zoneData.reducer.routeChoicesFilters,
  zoneDataInterfaceFlags: zoneData.reducer.zoneDataInterfaceFlags,
  map: map.reducer,
  datetimeBrushDomain: datetimeManager.reducer.datetimeBrushDomain,
  datetimeZoomDomain: datetimeManager.reducer.datetimeZoomDomain,
  ridershipDomain: datetimeManager.reducer.ridershipDomain,
  ridershipData: datetimeManager.reducer.ridershipData,
  datetimeManagerInterfaceFlags: datetimeManager.reducer.datetimeManagerInterfaceFlags,
  hoveredRouteId: linkingCoordinator.reducer.hoveredRouteId
})
