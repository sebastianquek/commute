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
      const newData = action.journeys.reduce((allData, route) => {
        const { origin_zone, destination_zone, ...properties } = route // eslint-disable-line
        if (!allData.hasOwnProperty(origin_zone)) {
          allData[origin_zone] = []
        }
        if (!allData.hasOwnProperty(destination_zone)) {
          allData[destination_zone] = []
        }
        allData[origin_zone].push({...properties, destination_zone})
        allData[destination_zone].push({...properties, origin_zone})
        return allData
      }, {})
      return {
        // ...state,
        ...newData
      }
    default:
      return state
  }
}
