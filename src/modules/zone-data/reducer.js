import * as t from './actionTypes'

export const zoneJourneyDataFilters = (state = {}, action) => {
  switch (action.type) {
    case t.FILTER_NUM_COMMUTERS:
      let newZoneDataFilter
      if (state.hasOwnProperty(action.id)) {
        newZoneDataFilter = {
          ...state[action.id],
          numCommuters: {min: action.min, max: action.max}
        }
      } else {
        newZoneDataFilter = {
          numCommuters: {min: action.min, max: action.max}
        }
      }

      return {
        ...state,
        [action.id]: newZoneDataFilter
      }
    default:
      return state
  }
}

export const zoneCompositionData = (state = {}, action) => {
  switch (action.type) {
    case t.RECEIVE_ZONE_COMPOSITIONS:
      return action.zones.features.reduce((zones, f) => {
        zones[f.properties.OBJECTID] = f.properties
        return zones
      }, {})
    default:
      return state
  }
}

export const zoneJourneyData = (state = {}, action) => {
  switch (action.type) {
    case t.RECEIVE_ZONE_JOURNEYS:
      const newData = action.journeys.features.reduce((allData, route) => {
        let {
          origin_zone: originZone,
          destination_zone: destinationZone,
          count,
          percentile,
          transport_services: services,
          stop_ids: stopIds,
          durations
        } = route.properties

        if (!allData.hasOwnProperty(originZone)) {
          allData[originZone] = []
        }
        if (!allData.hasOwnProperty(destinationZone)) {
          allData[destinationZone] = []
        }
        count = parseInt(count, 10)

        // Create an array of trips for the current route
        const trips = []
        for (let i = 0; i < services.length; i++) {
          let service = services[i]
          if (service.slice(0, 1) !== '{') { // Bus trip
            service = `${service.slice(0, -1)}(${service.slice(-1)})`
          }

          trips.push({
            service,
            originId: stopIds[i][0],
            destinationId: stopIds[i][1],
            duration: durations[i]
          })
        }
        allData[originZone].push({count, percentile, destinationZone, trips})
        allData[destinationZone].push({count, percentile, originZone, trips})
        return allData
      }, {})
      return {
        ...newData
      }

    case t.REMOVE_ZONE_JOURNEYS:
      return {}

    default:
      return state
  }
}
