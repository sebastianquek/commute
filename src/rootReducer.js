import {combineReducers} from 'redux'
import zoneManager from './modules/zone-manager'

export default combineReducers({
  zoneSelections: zoneManager.reducer
})
