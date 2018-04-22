import * as t from './actionTypes'

export const routeChoicesFilters = (state = {
  dataNumCommutersBounds: [50, 200], // Extent based on current route choices data
  dataDurationBounds: [25 * 60, 60 * 60], // Data is updated when selected filter is outside these bounds
  numCommuters: [50, 200],
  duration: [25 * 60, 60 * 60], // 1hr
  includeMrt: true,
  includeBus: true,
  filteredRouteIds: []
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
    case t.RECEIVE_ZONE_JOURNEYS:
      let dataNumCommutersBounds = []
      let dataDurationBounds = []
      if (action.journeys.features.length === 0) {
        return state
      }

      for (let route of action.journeys.features) {
        const { count, totalDuration } = route.properties
        if (dataNumCommutersBounds.length === 0) {
          dataNumCommutersBounds = [count, count]
          dataDurationBounds = [totalDuration, totalDuration]
          continue
        }
        if (count < dataNumCommutersBounds[0]) dataNumCommutersBounds[0] = count
        if (count > dataNumCommutersBounds[1]) dataNumCommutersBounds[1] = count
        if (totalDuration < dataDurationBounds[0]) dataDurationBounds[0] = totalDuration
        if (totalDuration > dataDurationBounds[1]) dataDurationBounds[1] = totalDuration
      }

      let numCommuters = [
        Math.max(state.numCommuters[0], dataNumCommutersBounds[0]),
        Math.min(state.numCommuters[1], dataNumCommutersBounds[1])
      ]

      // Ensure the domain is valid
      if (numCommuters[0] > numCommuters[1]) numCommuters = [numCommuters[0], numCommuters[0]]

      let duration = [
        Math.max(state.duration[0], dataDurationBounds[0]),
        Math.min(state.duration[1], dataDurationBounds[1])
      ]

      // Ensure the domain is valid
      if (duration[0] > duration[1]) duration = [duration[0], duration[0]]

      return {
        ...state,
        numCommuters,
        duration,
        dataNumCommutersBounds,
        dataDurationBounds
      }

    case t.SET_FILTERED_ROUTE_IDS:
      return {
        ...state,
        filteredRouteIds: action.filteredRouteIds
      }

    default:
      return state
  }
}

export const zoneCompositionData = (state = {}, action) => {
  switch (action.type) {
    case t.RECEIVE_ZONE_COMPOSITIONS:
      return action.zones.features.reduce((zones, f) => {
        zones[f.properties.objectid] = f.properties
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
          originZone,
          destinationZone,
          ...rest
        } = route.properties

        if (!allData.hasOwnProperty(originZone)) {
          allData[originZone] = []
        }
        if (!allData.hasOwnProperty(destinationZone)) {
          allData[destinationZone] = []
        }

        // Ensure that journeys are not repeated
        if (action.originZoneIds.includes(originZone)) {
          allData[originZone].push({...rest, destinationZone})
        } else if (action.destinationZoneIds.includes(destinationZone)) {
          allData[destinationZone].push({...rest, originZone})
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
  isFetchingZoneJourneyData: true,
  hasReceivedZoneCompositions: false
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
    case t.REMOVE_ZONE_JOURNEYS: // Ensure loading indicator hides on removal
      return {
        ...state,
        isFetchingZoneJourneyData: false
      }
    case t.RECEIVE_ZONE_COMPOSITIONS:
      return {
        ...state,
        hasReceivedZoneCompositions: true
      }
    default:
      return state
  }
}
