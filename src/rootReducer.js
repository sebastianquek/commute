import {combineReducers} from 'redux'
import zoneManager from './modules/zone-manager'
import zoneData from './modules/zone-data'

export default combineReducers({
  zoneSelections: zoneManager.reducer,
  zoneData: zoneData.reducer
})
