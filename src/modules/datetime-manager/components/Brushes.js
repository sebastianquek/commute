import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { VictoryChart, VictoryAxis, VictoryBrushContainer } from 'victory'
import moment from 'moment'
import { formatTime } from './Chart'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  pointer-events: none;
`

const Feedback = styled.span`
  position: absolute;
  bottom: 5%;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  font-weight: bold;
  font-size: 0.6em;
  color: ${({theme}) => theme.colors.textWarning};
  opacity: ${({visible}) => visible ? 1 : 0};
  transform: ${({visible}) => visible ? 'translateY(0)' : 'translateY(-20px)'};
  transition: all 0.7s;
  font-family: 'Barlow', sans-serif;
`

const DomainRange = styled.span`
  position: absolute;
  top: -18px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  font-weight: bold;
  font-size: 0.7em;
  color: ${({theme}) => theme.colors.textPrimary};
  transition: all 0.7s;
  font-family: 'Barlow', sans-serif;
`

class Brushes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      roundedZoomDomainX: [],
      allowDrag: true
    }
    this.handleBrush = this.handleBrush.bind(this)
    this.calcRoundedZoomDomain = this.calcRoundedZoomDomain.bind(this)
  }

  handleBrush (domain) {
    for (let i = 0; i < 2; i++) {
      domain.x[i] = this.roundToStep(this.props.minDate, domain.x[i], this.props.step)
    }
    if (
      this.props.brushDomain.x[0].getTime() !== domain.x[0].getTime() ||
      this.props.brushDomain.x[1].getTime() !== domain.x[1].getTime()
    ) {
      this.props.setDatetimeBrushDomain(domain)
    }
  }

  calcRoundedZoomDomain (newProps) {
    const roundedZoomDomainX = [
      this.roundToStep(newProps.minDate, newProps.zoomDomain.x[0], newProps.step, 'ceil'),
      this.roundToStep(newProps.minDate, newProps.zoomDomain.x[1], newProps.step, 'floor')
    ]
    let allowDrag = true
    if (newProps.brushDomain.x[0] < roundedZoomDomainX[0] || newProps.brushDomain.x[1] > roundedZoomDomainX[1]) {
      allowDrag = false
    }
    this.setState({
      roundedZoomDomainX,
      allowDrag
    })
  }

  moveToBrushedDomain (newProps) {
    if (
      (!moment(this.props.brushDomain.x[0]).isSame(newProps.brushDomain.x[0]) ||
      !moment(this.props.brushDomain.x[1]).isSame(newProps.brushDomain.x[1])) &&
      !(moment(newProps.brushDomain.x[0]).isBetween(...newProps.zoomDomain.x) ||
      moment(newProps.brushDomain.x[1]).isBetween(...newProps.zoomDomain.x))
    ) {
      const zoomDomainMiddleToEndDuration = moment.duration(moment(newProps.zoomDomain.x[1]).diff(moment(newProps.zoomDomain.x[0])) / 2)
      const brushDomainMiddleToEndDuration = moment.duration(moment(newProps.brushDomain.x[1]).diff(moment(newProps.brushDomain.x[0])) / 2)
      const newZoomDomain = {
        x: [
          moment(newProps.brushDomain.x[0]).add(brushDomainMiddleToEndDuration).subtract(zoomDomainMiddleToEndDuration).toDate(),
          moment(newProps.brushDomain.x[1]).subtract(brushDomainMiddleToEndDuration).add(zoomDomainMiddleToEndDuration).toDate()
        ]
      }
      if (newZoomDomain.x[0].getTime() < this.props.minDate.getTime()) {
        newZoomDomain.x = [
          this.props.minDate,
          moment(this.props.minDate).add(zoomDomainMiddleToEndDuration).add(zoomDomainMiddleToEndDuration).toDate()
        ]
      } else if (newZoomDomain.x[1].getTime() > this.props.maxDate.getTime()) {
        newZoomDomain.x = [
          moment(this.props.maxDate).subtract(zoomDomainMiddleToEndDuration).subtract(zoomDomainMiddleToEndDuration).toDate(),
          this.props.maxDate
        ]
      }
      this.props.setDatetimeZoomDomain(newZoomDomain)
    }
  }

  componentWillReceiveProps (newProps) {
    this.calcRoundedZoomDomain(newProps)
    this.moveToBrushedDomain(newProps)
  }

  roundToStep (minDate, date, step = 'PT1H', direction) {
    const momentMinDateUnix = moment(minDate).unix()
    const momentDateUnix = moment(date).unix()
    const stepSeconds = moment.duration(step).as('seconds')
    if (direction === 'floor') {
      return moment.unix(momentMinDateUnix + Math.floor((momentDateUnix - momentMinDateUnix) / stepSeconds) * stepSeconds).toDate()
    } else if (direction === 'ceil') {
      return moment.unix(momentMinDateUnix + Math.ceil((momentDateUnix - momentMinDateUnix) / stepSeconds) * stepSeconds).toDate()
    } else {
      return moment.unix(momentMinDateUnix + Math.round((momentDateUnix - momentMinDateUnix) / stepSeconds) * stepSeconds).toDate()
    }
  }

  render () {
    return (
      <Wrapper>
        <DomainRange>{`${formatTime(this.props.brushDomain.x[0])} – ${formatTime(this.props.brushDomain.x[1])}`}</DomainRange>
        <Feedback visible={!this.state.allowDrag}>Brush panning is disabled, ensure entire brush is visible to re-enable</Feedback>
        <VictoryChart
          padding={{top: 0, bottom: 0, left: 0, right: 0}}
          width={this.props.width}
          height={this.props.height / 7.5}
          domain={this.props.zoomDomain}
          containerComponent={
            <VictoryBrushContainer
              allowDrag={this.state.allowDrag}
              brushDomain={this.props.brushDomain}
              brushDimension='x'
              onBrushDomainChange={this.handleBrush}
              style={{height: this.props.height / 7.5, marginLeft: '58px', marginRight: '34px', marginBottom: '1.1em'}}
              brushStyle={{stroke: 'transparent', fill: 'black', fillOpacity: 0.1, cursor: this.state.allowDrag ? 'move' : 'auto'}}
            />
          }
        >
          <VictoryAxis
            dependentAxis
            tickFormat={() => ''}
            style={{axis: {opacity: 0}}}
          />
          <VictoryAxis
            tickFormat={() => ''}
            scale={{x: 'time'}}
            style={{axis: {opacity: 0}}}
          />
        </VictoryChart>
      </Wrapper>
    )
  }
}

Brushes.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  brushDomain: PropTypes.object.isRequired,
  zoomDomain: PropTypes.object.isRequired,
  step: PropTypes.string.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired,
  setDatetimeBrushDomain: PropTypes.func.isRequired,
  setDatetimeZoomDomain: PropTypes.func.isRequired
}

export default Brushes
