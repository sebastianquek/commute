import React from 'react'
import PropTypes from 'prop-types'
import RouteInfoTooltip from '../../core/components/RouteInfoTooltip'
import TooltipWrapper from '../../core/components/Tooltip'
import ZoneDetails from '../../core/components/ZoneDetails'

// Tooltip for elements on the map
const Tooltip = (props) => {
  if (!props.x || !props.y) return null
  let { layer: { source }, properties } = props.feature

  switch (source) {
    case 'zones':
      return (
        <TooltipWrapper
          x={props.x}
          y={props.y}
          minWidth='0px'
        >
          <ZoneDetails
            mainDetail={properties.lu_desc}
            subDetail={`${properties.subzone_n} — ${properties.objectid}`}
            animate={false}
          />
        </TooltipWrapper>
      )

    case 'journeys':
      try {
        properties.trips = JSON.parse(properties.trips)
        properties.originZoneData = JSON.parse(properties.originZoneData)
        properties.destinationZoneData = JSON.parse(properties.destinationZoneData)
      } catch (e) {
        // No parsing was needed
      }

      return (
        <RouteInfoTooltip
          link={properties}
          maxDuration={props.maxDuration}
          x={props.x}
          y={props.y}
        />
      )

    default:
      break
  }

  return null
}

Tooltip.propTypes = {
  feature: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  maxDuration: PropTypes.number.isRequired,
  zoneIdToGroupColor: PropTypes.func,
  zoneIdToName: PropTypes.object
}

export default Tooltip
