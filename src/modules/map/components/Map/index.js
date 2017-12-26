import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapGL from 'react-map-gl'

const MAPBOX_TOKEN = ''

export class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 1.3450,
        longitude: 103.8132,
        zoom: 11,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      }
    }
    this.resize = this.resize.bind(this)
    this.onViewportChange = this.onViewportChange.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.handleHover = this.handleHover.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  onLoad () {
    this.props.fetchZones()
  }

  onViewportChange (viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    })
  }

  resize () {
    this.onViewportChange({
      ...this.state.viewport,
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  handleHover (event) {
    const {features} = event
    if (features && features[0]) {
      this.props.hoverOverFeature(features[0])
      // const hoveredZone = features.find(f => f.layer.id === 'zones')
      // hoveredZone && this.props.hoverOverZone(hoveredZone)
    }
  }

  render () {
    return (
      <MapGL
        ref={map => (this.mapRef = map)}
        {...this.state.viewport}
        mapStyle={this.props.mapStyle}
        onViewportChange={this.onViewportChange}
        onLoad={this.onLoad}
        onHover={this.handleHover}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
      </MapGL>
    )
  }
}

Map.propTypes = {
  mapStyle: PropTypes.object.isRequired,
  fetchZones: PropTypes.func.isRequired,
  hoverOverFeature: PropTypes.func.isRequired
}

export default Map
