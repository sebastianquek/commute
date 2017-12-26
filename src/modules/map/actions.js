import * as t from './actionTypes'
import * as topojson from 'topojson-client'
import ZONES from './zones.json'

const requestZones = () => ({
  type: t.REQUEST_ZONES
})

const receiveZones = geojson => ({
  type: t.RECEIVE_ZONES,
  zones: geojson
})

export function fetchZones () {
  return dispatch => {
    dispatch(requestZones())
    // return fetch('http://localhost:1337/api/v1/zones')
    //   .then(response => response.json())
    //   .then(zones => {
    //     dispatch(receiveZones(zones))
    //   })
    const data = topojson.feature(ZONES, ZONES.objects.zones)
    dispatch(receiveZones(data))
  }
}

const hoverOverZone = zoneId => ({
  type: t.HOVER_OVER_ZONE,
  zoneId
})

export function hoverOverFeature (feature) {
  return dispatch => {
    if (feature.layer.id === 'zones') {
      dispatch(hoverOverZone(feature.properties.OBJECTID))
    }
  }
}
