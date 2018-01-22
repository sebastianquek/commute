import React from 'react'
import { connect } from 'react-redux'
import Map from '../components/Map'
import { mapStyleSelector } from '../selectors'
import { mapHasLoaded, hoverOverFeature, selectFeature, colorSelectedZones } from '../actions'
import zoneManager from '../../zone-manager'
// import zoneData from '../../zone-data'

const MapContainer = (props) => {
  return (
    <Map
      {...props}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    mapStyle: mapStyleSelector(state),
    zoneSelectionMode: zoneManager.selectors.zoneSelectionModeSelector(state),
    categorizedZones: zoneManager.selectors.allZonesSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  // fetchZones: zoneData.actions.fetchZones,
  mapHasLoaded,
  hoverOverFeature,
  selectFeature,
  addSelection: zoneManager.actions.addSelection,
  resetSelectionMode: zoneManager.actions.resetSelectionMode,
  colorSelectedZones
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer)
