import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import styled from 'styled-components'
import Tooltip from '../Tooltip'
import SelectionModeFeedback from '../SelectionModeFeedback'
import c from '../../../../utils/randomColor'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`

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
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  async onLoad () {
    await this.props.fetchZones()
    this.props.colorSelectedZones([...this.props.categorizedZones.origins, ...this.props.categorizedZones.destinations])
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
    const {features, srcEvent: {x, y}} = event
    let hoveredFeature = null
    if (features && features[0]) {
      hoveredFeature = features[0]
      this.props.hoverOverFeature(hoveredFeature)
    }
    this.setState({hoveredFeature, x, y})
  }

  handleClick (event) {
    const {features} = event
    if (features) {
      const zone = features.find(f => f.layer.id === 'zones')
      if (this.props.zoneSelectionMode) {
        zone && this.props.addSelection(zone.properties.OBJECTID, c.next().value, this.props.zoneSelectionMode)
      } else {
        zone && this.props.selectFeature(zone)
      }
    }
  }

  render () {
    return (
      <Wrapper>
        <MapGL
          ref={map => (this.mapRef = map)}
          {...this.state.viewport}
          mapStyle={this.props.mapStyle}
          onViewportChange={this.onViewportChange}
          onLoad={this.onLoad}
          onHover={this.handleHover}
          onClick={this.handleClick}
          mapboxApiAccessToken={process.env.MAPBOX_TOKEN}>

          {this.state.hoveredFeature &&
            <Tooltip x={this.state.x} y={this.state.y}>
              {this.state.hoveredFeature.properties.REGION_N}<br/>
              {this.state.hoveredFeature.properties.PLN_AREA_N}<br/>
              {this.state.hoveredFeature.properties.SUBZONE_N}
            </Tooltip>
          }

          {this.props.zoneSelectionMode &&
            <SelectionModeFeedback
              selectionMode={this.props.zoneSelectionMode}
              onClick={this.props.resetSelectionMode}/>
          }
        </MapGL>
      </Wrapper>
    )
  }
}

Map.propTypes = {
  mapStyle: PropTypes.object.isRequired,
  zoneSelectionMode: PropTypes.string,
  categorizedZones: PropTypes.object.isRequired,
  fetchZones: PropTypes.func.isRequired,
  hoverOverFeature: PropTypes.func.isRequired,
  selectFeature: PropTypes.func.isRequired,
  addSelection: PropTypes.func.isRequired,
  resetSelectionMode: PropTypes.func.isRequired,
  colorSelectedZones: PropTypes.func.isRequired
}

export default Map
