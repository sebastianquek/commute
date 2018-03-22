import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as d3 from 'd3'
import ZoneButton from '../../core/components/ZoneButton'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  border-radius: 2px;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);
  font-family: Barlow, sans-serif;
  position: relative;
  margin: 1.5em 0;
  min-width: 300px;
  color: ${({theme}) => theme.colors.textPrimary};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% + 3px);
    top: 0;
    width: 0; 
    height: 0; 
    border: 6px solid black;
    border-color: transparent transparent white white;
    transform-origin: 0 0;
    transform: rotate(135deg);
    box-shadow: -3px 3px 10px -2px rgba(0, 0, 0, 0.2);
  }
`

const ZoneInfo = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-column-gap: 5px;
  align-items: center;
  margin-bottom: 0.8rem;
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
`

const Label = styled.div`
  min-width: ${({minWidth}) => minWidth}px;
`

const ServiceLabel = Label.extend`
  padding-right: 0.5em;
  font-size: 1.2rem;
  font-weight: 700;
`

const DurationLabel = Label.extend`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
`

const DurationBar = styled.div`
  width: ${({width}) => width}px;
  height: 16px;
  border: 1px solid black;

  :not(:last-child) {
    border-right: none;
  }
`

const JourneyInfoTooltip = ({ data, durationBarsWidth }) => {
  const scale = d3.scaleLinear()
    .domain([0, d3.max(data.trips, d => d.duration)])
    .range([0, durationBarsWidth])

  let serviceLabels = []
  let durationBars = []
  let durationLabels = []

  data.trips.map(t => ({...t, durationBarWidth: scale(t.duration)}))
    .forEach(t => {
      serviceLabels.push(<ServiceLabel minWidth={t.durationBarWidth} key={t.service}>{t.service}</ServiceLabel>)
      durationBars.push(<DurationBar width={t.durationBarWidth} key={t.service}/>)
      durationLabels.push(<DurationLabel minWidth={t.durationBarWidth} key={t.service}>{Math.round(t.duration / 60)}mins</DurationLabel>)
    })

  return (
    <Wrapper>
      <ZoneInfo>
        <ZoneIcon><ZoneButton hover={false}>{data.source.zone}</ZoneButton></ZoneIcon>
        <ZoneName>Tiong Bahru</ZoneName>
        <Arrow>↓</Arrow>
        <div><strong>{data.count}</strong> commuters took <strong>{Math.round(data.totalDuration / 60)}</strong> mins on the average</div>
        <ZoneIcon><ZoneButton hover={false}>{data.target.zone}</ZoneButton></ZoneIcon>
        <ZoneName>Harbourfront</ZoneName>
      </ZoneInfo>
      <div>
        <TimelineContainer>{serviceLabels}</TimelineContainer>
        <TimelineContainer>{durationBars}</TimelineContainer>
        <TimelineContainer>{durationLabels}</TimelineContainer>
      </div>
    </Wrapper>
  )
}

JourneyInfoTooltip.propTypes = {
  data: PropTypes.object,
  durationBarsWidth: PropTypes.number
}

JourneyInfoTooltip.defaultProps = {
  data: {
    'count': 24,
    'stop_ids': [
      [
        '12',
        '8'
      ]
    ],
    'totalDuration': 665,
    'durations': [
      665.0416666666666
    ],
    'percentile': 0.997835497835498,
    'source': {
      'zone': 5,
      'numLinks': 29,
      'index': 2,
      'x': 334.35231900133914,
      'y': 264.18505047582204,
      'vy': 0.6875630505581317,
      'vx': -2.0709095004463953
    },
    'target': {
      'zone': 63,
      'numLinks': 2,
      'index': 8,
      'x': 225.96987531328605,
      'y': 323.4847288141466,
      'vy': 0.9417040607688327,
      'vx': -2.026455898317618
    },
    'transport_services': [
      '{EW,NS}'
    ],
    'direction': 0,
    'linkNum': 1,
    'index': 23,
    'trips': [
      { service: '123', originId: '1', destinationId: '2', duration: 1200 },
      { service: '4566666666', originId: '1', destinationId: '2', duration: 480 },
      { service: '{CC,EW,NE}', originId: '115', destinationId: '114', duration: 1800 }
    ]
  },
  durationBarsWidth: 200
}

export default JourneyInfoTooltip
