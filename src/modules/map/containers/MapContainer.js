import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Map from '../components/Map'
import { hoverOverFeature, selectFeature, colorSelectedZones } from '../actions'
import { mapStyleSelector } from '../selectors'
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
