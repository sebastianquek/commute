import zoneData from './modules/zone-data'
import datetimeManager from './modules/datetime-manager'
import map from './modules/map'
import zoneManager from './modules/zone-manager'

export default function * rootSaga () {
  yield [
    zoneData.sagas.watchAndUpdateZoneJourneys(),
    zoneData.sagas.getInitialZoneJourneys(),
    zoneData.sagas.getZoneCompositions(),
    datetimeManager.sagas.watchAndReplaceAllRidershipData(),
    datetimeManager.sagas.watchAndUpdateRidershipData(),
    datetimeManager.sagas.getInitialRidership(),
    datetimeManager.sagas.watchAndUpdateDatetimeZoom(),
    map.sagas.updateMapOnLoad(),
    map.sagas.updateJourneys(),
    map.sagas.watchForMouseEvents(),
    zoneManager.sagas.watchForZoneSelectionChanges(),
    zoneManager.sagas.watchForDeletionOfGroups()
  ]
}
