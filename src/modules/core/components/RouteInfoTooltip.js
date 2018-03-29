import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as d3 from 'd3'
import ZoneButton from './ZoneButton'

const Wrapper = styled.div.attrs({
  style: ({x, y}) => ({
    top: `${y}px`,
    left: `${x}px`
  })
})`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  border-radius: 2px;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);
  font-family: Barlow, sans-serif;
  position: absolute;
  margin: 1.5em 0;
  min-width: 300px;
  color: ${({theme}) => theme.colors.textPrimary};
  background: rgba(255, 255, 255, 0.8);
  transform: translate(-148px, -6px);
  transition: all 0.15s;
  opacity: ${({hidden}) => hidden ? 0 : 1};
  visibility: ${({hidden}) => hidden ? 'hidden' : 'visible'};
  z-index: 4;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% + 6px);
    top: 0;
    width: 0; 
    height: 0; 
    border: 6px solid black;
    border-color: transparent transparent white white;
    transform-origin: 0 0;
    transform: rotate(135deg);
    box-shadow: -3px 3px 10px -2px rgba(0, 0, 0, 0.3);
  }
`

const ZoneInfo = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-column-gap: 10px;
  align-items: center;
  margin-bottom: 1rem;
`

const ZoneName = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
`

const Arrow = styled.div`
  justify-self: center;
`

const ZoneIcon = styled.div`
  justify-self: center;
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
      const match = t.service.slice(0, 1).match(/[a-zA-Z]/)
      const color = match ? '#F98C73' : '#62D090'
      const service = t.service.split('→').map((s, i) => <div key={s}>{i > 0 ? '⤷ ' : ''}{s}</div>)
      serviceLabels.push(<ServiceLabel minWidth={t.durationBarWidth} key={t.service}>{service}</ServiceLabel>)
      durationBars.push(<DurationBar width={t.durationBarWidth} color={color} key={t.service}/>)
      durationLabels.push(<DurationLabel minWidth={t.durationBarWidth} key={t.service}>{Math.round(t.duration / 60)}mins</DurationLabel>)
    })

  return (
    <Wrapper x={x} y={y} hidden={hidden} className='tooltip'>
      <ZoneInfo>
        <ZoneIcon><ZoneButton animate={false} hover={false} color={link.sourceColor} circle={link.sourceColor !== '#ddd'}>{link.originZone}</ZoneButton></ZoneIcon>
        <ZoneName>{link.originZoneName}</ZoneName>
        <Arrow>↓</Arrow>
        <div><strong>{link.count}</strong> commuter{link.count > 1 ? 's' : ''} took <strong>{Math.round(link.totalDuration / 60)}</strong> mins{link.count > 1 ? ' on the average' : ''}</div>
        <ZoneIcon><ZoneButton animate={false} hover={false} color={link.targetColor} circle={link.targetColor !== '#ddd'}>{link.destinationZone}</ZoneButton></ZoneIcon>
        <ZoneName>{link.destinationZoneName}</ZoneName>
      </ZoneInfo>
      <div>
        <TimelineContainer>{serviceLabels}</TimelineContainer>
        <TimelineContainer>{durationBars}</TimelineContainer>
        <TimelineContainer>{durationLabels}</TimelineContainer>
      </div>
    </Wrapper>
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
