import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Map from '../components/Map'
import { fetchZones, hoverOverFeature } from '../actions'

const MapContainer = (props) => {
  return (
    <Map
      {...props}
    />
  )
}

MapContainer.propTypes = {
  mapStyle: PropTypes.object.isRequired,
  fetchZones: PropTypes.func.isRequired,
  hoverOverFeature: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    mapStyle: state.mapStyle,
    ...ownProps
  }
}

const mapDispatchToProps = {
  fetchZones,
  hoverOverFeature
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer)
