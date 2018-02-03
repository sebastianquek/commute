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
  position: absolute;
  padding: 0.6em 0.8em;
  max-width: 220px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: ${({theme}) => theme.borderRadius};
  font-size: ${({theme}) => theme.typography.tooltipSize};
  font-family: 'Barlow', sans-serif;
  letter-spacing: 1px;
`

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
      const buses = JSON.parse(properties.buses)
        .map(bus => `${bus.slice(0, bus.length - 1)}(${bus.slice(bus.length - 1)})`)
        .join(', ')
      const stops = JSON.parse(properties.stops).join(', ')
      const durations = JSON.parse(properties.durations)
        .map(d => {
          return moment.duration(d, 'seconds').humanize()
        })
        .join(', ')
      const count = JSON.parse(properties.count)

      desc = (
        <div>
          Buses: {buses}<br/>
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
