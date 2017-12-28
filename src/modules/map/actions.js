import * as t from './actionTypes'
import * as topojson from 'topojson-client'

const requestZones = () => ({
  type: t.REQUEST_ZONES
})

const receiveZones = geojson => ({
  type: t.RECEIVE_ZONES,
  zones: geojson
})

export function fetchZones () {
  return async dispatch => {
    dispatch(requestZones())
    const res = await fetch('http://localhost:1337/api/v2/zones')
    const resJson = await res.json()
    const data = topojson.feature(resJson, resJson.objects.zones)
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

export const colorSelectedZones = zones => ({
  type: t.COLOR_SELECTED_ZONES,
  zones
})
