import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as d3 from 'd3'
import Tooltip from './Tooltip'
import ZoneDetails from '../../core/components/ZoneDetails'
import get from 'lodash.get'

const ZoneInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const RouteInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.4rem 0;
  align-items: center;
`

const Arrow = styled.div`
  margin: 0 1rem;
  font-size: 1.4rem;
`

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

const Label = styled.div`
  min-width: ${({minWidth}) => minWidth}px;
`

const ServiceLabel = Label.extend`
  padding-right: 0.5em;
  font-size: 1.2rem;
  font-weight: 600;

  :not(:last-child) {
    margin-right: 3px;
  }
`

const DurationLabel = Label.extend`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
`

const DurationBar = styled.div`
  width: ${({width}) => width}px;
  background-color: ${({color}) => color};
  height: 8px;
  border-radius: 5px;
  margin: 2px 0;

  :not(:last-child) {
    margin-right: 3px;
  }
`

const RouteInfoTooltip = ({ link, durationBarsWidth, x, y, hidden, maxDuration }) => {
  const scale = d3.scaleLinear()
    .domain([0, maxDuration])
    .range([0, durationBarsWidth])

  let serviceLabels = []
  let durationBars = []
  let durationLabels = []

  link.trips.map(t => ({...t, durationBarWidth: scale(t.duration)}))
    .forEach(t => {
      const isTrain = t.service.slice(0, 1).match(/[a-zA-Z]/)
      const color = isTrain ? '#F98C73' : '#62D090'
      const service = t.service.split('→').map((s, i) => <div key={s}>{i > 0 ? '⤷ ' : ''}{s}</div>)
      serviceLabels.push(<ServiceLabel minWidth={t.durationBarWidth} key={t.service}>{service}</ServiceLabel>)
      durationBars.push(<DurationBar width={t.durationBarWidth} color={color} key={t.service}/>)
      durationLabels.push(<DurationLabel minWidth={t.durationBarWidth} key={t.service}>{Math.round(t.duration / 60)}mins</DurationLabel>)
    })

  return (
    <Tooltip x={x} y={y} hidden={hidden} className='tooltip'>
      <ZoneInfo>
        <ZoneDetails
          mainDetail={get(link, ['originZoneData', 'lu_desc'], '')}
          subDetail={`${get(link, ['originZoneData', 'subzone_n'], '')} — ${get(link, ['originZoneData', 'objectid'], '')}`}
          animate={false}
        />
        <RouteInfo>
          <Arrow>↓</Arrow>
          <div><strong>{link.count}</strong> commuter{link.count > 1 ? 's' : ''} took <strong>{Math.round(link.totalDuration / 60)}</strong> mins{link.count > 1 ? ' on the average' : ''}</div>
        </RouteInfo>
        <ZoneDetails
          mainDetail={get(link, ['destinationZoneData', 'lu_desc'], '')}
          subDetail={`${get(link, ['destinationZoneData', 'subzone_n'], '')} — ${get(link, ['destinationZoneData', 'objectid'], '')}`}
          animate={false}
        />
      </ZoneInfo>
      <div>
        <TimelineContainer>{serviceLabels}</TimelineContainer>
        <TimelineContainer>{durationBars}</TimelineContainer>
        <TimelineContainer>{durationLabels}</TimelineContainer>
      </div>
    </Tooltip>
  )
}

RouteInfoTooltip.propTypes = {
  link: PropTypes.object.isRequired,
  durationBarsWidth: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  hidden: PropTypes.bool,
  maxDuration: PropTypes.number.isRequired
}

RouteInfoTooltip.defaultProps = {
  durationBarsWidth: 260
}

export default RouteInfoTooltip
