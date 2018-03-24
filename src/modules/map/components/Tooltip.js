import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import RouteInfoTooltip from '../../core/components/RouteInfoTooltip'

const Wrapper = styled.div.attrs({
  style: ({x, y}) => ({
    top: `${y + 10}px`,
    left: `${x + 10}px`
  })
})`
  // background: rgba(0, 0, 0, 0.8);
  // border-radius: ${({theme}) => theme.borderRadius};
  // color: white;
  // font-family: 'Barlow', sans-serif;
  // font-size: ${({theme}) => theme.typography.tooltipSize};
  // letter-spacing: 1px;
  // max-width: 220px;
  // padding: 0.6em 0.8em;
  position: absolute;
`

// Tooltip for elements on the map
const Tooltip = (props) => {
  if (!props.x || !props.y) return null
  let { layer: { source }, properties } = props.feature
  let desc

  switch (source) {
    case 'zones':
      desc = (
        <div>
          {properties.REGION_N}<br/>
          {properties.PLN_AREA_N}<br/>
          {properties.SUBZONE_N}
        </div>
      )
      break

    case 'journeys':
      try {
        properties.trips = JSON.parse(properties.trips)
      } catch (e) {
        // No parsing was needed
      }
      properties.originZoneName = props.zoneIdToName[properties.originZone]
      properties.destinationZoneName = props.zoneIdToName[properties.destinationZone]
      properties.sourceColor = props.zoneIdToGroupColor(properties.originZone)
      properties.targetColor = props.zoneIdToGroupColor(properties.destinationZone)
      desc = (
        <RouteInfoTooltip
          link={properties}
        />
      )
      break

    default:
      break
  }
  if (desc) return <Wrapper {...props}>{desc}</Wrapper>
  return null
}

Tooltip.propTypes = {
  feature: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  zoneIdToGroupColor: PropTypes.func,
  zoneIdToName: PropTypes.object
}

export default Tooltip
