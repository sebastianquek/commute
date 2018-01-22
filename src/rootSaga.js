import zoneData from './modules/zone-data'
import map from './modules/map'

export default function * rootSaga () {
  yield [
    zoneData.sagas.getZoneCompositions(),
    map.sagas.displayZoneCompositions()
  ]
}
