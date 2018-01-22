import zoneData from './modules/zone-data'
import datetimeManager from './modules/datetime-manager'
import map from './modules/map'

export default function * rootSaga () {
  yield [
    zoneData.sagas.watchAndUpdateZoneJourneys(),
    zoneData.sagas.getInitialZoneJourneys(),
    zoneData.sagas.getZoneCompositions(),
    datetimeManager.sagas.watchAndUpdateRidership(),
    datetimeManager.sagas.getInitialRidership(),
    map.sagas.displayZoneCompositions()
  ]
}
