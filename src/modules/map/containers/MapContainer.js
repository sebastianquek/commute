import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Map from '../components/Map'
import { fetchZones, hoverOverFeature, selectFeature, colorSelectedZones } from '../actions'
import zoneManager from '../../zone-manager'

const MapContainer = (props) => {
  return (
    <Map
      {...props}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    mapStyle: state.map.mapStyle,
    zoneSelectionMode: state.zoneManager.zoneSelectionMode,
    categorizedZones: state.zoneManager.categorizedZones,
    ...ownProps
  }
}

const mapDispatchToProps = {
  fetchZones,
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
