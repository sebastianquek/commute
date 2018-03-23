import * as t from './actionTypes'

export const routeChoicesFilters = (state = {
  numCommuters: [0, 100],
  duration: [0, 60 * 60], // 1hr
  includeMrt: true,
  includeBus: true
}, action) => {
  switch (action.type) {
    case t.FILTER_NUM_COMMUTERS:
      return {
        ...state,
        numCommuters: action.domain
      }
    case t.FILTER_DURATION:
      return {
        ...state,
        duration: action.domain
      }
    case t.FILTER_MODES_OF_TRANSPORT:
      return {
        ...state,
        includeMrt: action.mrt,
        includeBus: action.bus
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
          const match = service.slice(0, 1).match(/[a-zA-Z]/)
          if (!match) { // Bus trip
            service = `${service.slice(0, -1)} (${service.slice(-1)})`
          } else { // MRT trip
            service = service.split('>')
              .map(s => s.toLowerCase()
                .split(' ')
                .map(c => `${c.substring(0, 1).toUpperCase()}${c.substring(1)}`)
                .join(' ')
              )
              .join('→')
          }

          trips.push({
            service,
            originId: stopIds[i][0],
            destinationId: stopIds[i][1],
            duration: durations[i]
          })
        }

        // Ensure that journeys are not repeated
        if (action.originZoneIds.includes(originZone)) {
          allData[originZone].push({count, percentile, destinationZone, trips})
        } else if (action.destinationZoneIds.includes(destinationZone)) {
          allData[destinationZone].push({count, percentile, originZone, trips})
        }

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

export const zoneDataInterfaceFlags = (state = {
  shouldRouteChoicesChartUpdate: false,
  isFetchingZoneJourneyData: true
}, action) => {
  switch (action.type) {
    case t.FORCE_ROUTE_CHOICES_CHART_UPDATE:
      return {
        ...state,
        shouldRouteChoicesChartUpdate: true
      }
    case t.RESET_FORCE_ROUTE_CHOICES_CHART_UPDATE:
      return {
        ...state,
        shouldRouteChoicesChartUpdate: false
      }
    case t.FETCHING_ZONE_JOURNEYS:
      return {
        ...state,
        isFetchingZoneJourneyData: true
      }
    case t.RECEIVE_ZONE_JOURNEYS:
      return {
        ...state,
        isFetchingZoneJourneyData: false
      }
    default:
      return state
  }
}
