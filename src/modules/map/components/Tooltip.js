import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

const Wrapper = styled.div.attrs({
  style: ({x, y}) => ({
    top: `${y + 10}px`,
    left: `${x + 10}px`
  })
})`
  background: rgba(0, 0, 0, 0.8);
  border-radius: ${({theme}) => theme.borderRadius};
  color: white;
  font-family: 'Barlow', sans-serif;
  font-size: ${({theme}) => theme.typography.tooltipSize};
  letter-spacing: 1px;
  max-width: 220px;
  padding: 0.6em 0.8em;
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
      const services = JSON.parse(properties.transport_services)
        .map(service => {
          const match = service.slice(0, 1).match(/[a-zA-Z]/)
          if (!match) { // Bus trip
            service = `${service.slice(0, -1)} (${service.slice(-1)})`
          } else { // MRT trip
            service = service.split('>')
              .map(s => s.toLowerCase()
                .split(' ')
                .map(c => `${c.substring(0, 1).toUpperCase()}${c.substring(1)}`)
                .join(' ')
              )
              .join('→')
          }
          return service
        })
        .join(', ')
      const stops = JSON.parse(properties.stop_ids).join(', ')
      const durations = JSON.parse(properties.durations)
        .map(d => {
          return moment.duration(d, 'seconds').humanize()
        })
        .join(', ')
      const count = JSON.parse(properties.count)

      desc = (
        <div>
          Services: {services}<br/>
          Stops: {stops}<br/>
          Durations: {durations}<br/>
          Number of commuters: {count}<br/>
        </div>
      )
      break

    default:
      break
  }
  if (desc) return <Wrapper {...props}>{desc}</Wrapper>
}

Tooltip.propTypes = {
  feature: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number
}

export default Tooltip
