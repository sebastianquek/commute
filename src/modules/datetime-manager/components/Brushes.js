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
  display: flex;
  flex-direction: column;
  pointer-events: all;
  align-items: center;
`

const Button = styled.button`
  margin-top: 0.5em;
  font-family: 'Barlow', sans-serif;
  background-color: transparent;
  border: 1px solid ${({theme}) => theme.colors.borderSecondary};
  border-radius: ${({theme}) => theme.borderRadius};
  cursor: pointer;
  color: ${({theme}) => theme.colors.textPrimary};
  padding: 0.3em 0.46em;
  font-size: 0.9em;
  opacity: ${({visible}) => visible ? 1 : 0};
  pointer-events: ${({visible}) => visible ? 'all' : 'none'};
  transform: ${({visible}) => visible ? 'translateY(0)' : 'translateY(-20px)'};
  transition: all 0.7s;
  outline: none;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 10px 0;
    transform: translate(0, -1px);
  }
`

class Brushes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      roundedZoomDomainX: [],
      allowDrag: true,
      isBrushVisible: true
    }
    this.handleBrush = this.handleBrush.bind(this)
    this.updateBrushVisibleState = this.updateBrushVisibleState.bind(this)
    this.calcRoundedZoomDomain = this.calcRoundedZoomDomain.bind(this)
    this.moveToBrushedDomain = this.moveToBrushedDomain.bind(this)
  }

  isLeftBrushHandleVisible (brushDomainX, zoomDomainX) {
    return moment(brushDomainX[0]).isBetween(...zoomDomainX, null, '[]')
  }

  isRightBrushHandleVisible (brushDomainX, zoomDomainX) {
    return moment(brushDomainX[1]).isBetween(...zoomDomainX, null, '[]')
  }

  isBrushVisible (brushDomainX, zoomDomainX) {
    return moment(brushDomainX[0]).isBefore(zoomDomainX[1]) &&
      moment(brushDomainX[1]).isAfter(zoomDomainX[0])
  }

  isBrushFullyVisible (brushDomainX, zoomDomainX) {
    return this.isLeftBrushHandleVisible(brushDomainX, zoomDomainX) &&
      this.isRightBrushHandleVisible(brushDomainX, zoomDomainX)
  }

  handleBrush (domain) {
    // Round to the nearest interval
    for (let i = 0; i < 2; i++) {
      domain.x[i] = this.roundToStep(this.props.minDate, domain.x[i], this.props.step)
    }

    // Only update the lower bound of the domain if the handle is visible
    // Ensures that a change in the upper bound of the domain
    // will not incorrectly affect the lower bound.
    if (this.isLeftBrushHandleVisible(this.props.brushDomain.x, this.props.zoomDomain.x) &&
      moment(domain.x[0]).isBefore(this.state.roundedZoomDomainX[0])) {
      domain.x[0] = this.state.roundedZoomDomainX[0]
      domain.x[1] = this.props.brushDomain.x[1] // use the old upper bound
    }

    if (this.isRightBrushHandleVisible(this.props.brushDomain.x, this.props.zoomDomain.x) &&
        moment(domain.x[1]).isAfter(this.state.roundedZoomDomainX[1])) {
      domain.x[1] = this.state.roundedZoomDomainX[1]
      domain.x[0] = this.props.brushDomain.x[0]
    }

    // Only update if there are changes to the brush domain
    if (
      !moment(this.props.brushDomain.x[0]).isSame(domain.x[0]) ||
      !moment(this.props.brushDomain.x[1]).isSame(domain.x[1])
    ) {
      this.props.setDatetimeBrushDomain(domain)
    }
  }  

  updateBrushVisibleState (newProps) {
    this.setState({
      isBrushVisible: this.isBrushVisible(newProps.brushDomain.x, newProps.zoomDomain.x)
    })
  }

  calcRoundedZoomDomain (newProps) {
    const roundedZoomDomainX = [
      this.roundToStep(newProps.minDate, newProps.zoomDomain.x[0], newProps.step, 'ceil'),
      this.roundToStep(newProps.minDate, newProps.zoomDomain.x[1], newProps.step, 'floor')
    ]
    this.setState({
      roundedZoomDomainX,
      allowDrag: this.isBrushFullyVisible(newProps.brushDomain.x, roundedZoomDomainX)
    })
  }

  checkMoveToBrushedDomain (newProps) {
    if (
      moment(this.props.brushDomain.x[0]).isSame(newProps.brushDomain.x[0]) &&
      moment(this.props.brushDomain.x[1]).isSame(newProps.brushDomain.x[1])
    ) {
      return
    }

    // First case handles when the entire brush was visible, but now some part has moved out of screen
    // Second case handles when a part of the brush was visible, but now moved fully out of screen
    if (
      (this.isBrushFullyVisible(this.props.brushDomain.x, this.props.zoomDomain.x) &&
      !this.isBrushFullyVisible(newProps.brushDomain.x, newProps.zoomDomain.x)) ||
      (this.isBrushVisible(this.props.brushDomain.x, this.props.zoomDomain.x) &&
      !this.isBrushVisible(newProps.brushDomain.x, newProps.zoomDomain.x))
    ) {
      this.moveToBrushedDomain(newProps.brushDomain.x, newProps.zoomDomain.x)
    }
  }

  moveToBrushedDomain (brushDomainX, zoomDomainX) {
    const zoomDomainMiddleToEndDuration = moment.duration(moment(zoomDomainX[1]).diff(zoomDomainX[0]) / 2)
    const brushDomainMiddleToEndDuration = moment.duration(moment(brushDomainX[1]).diff(brushDomainX[0]) / 2)
    const newZoomDomain = {
      x: [
        moment(brushDomainX[0]).add(brushDomainMiddleToEndDuration).subtract(zoomDomainMiddleToEndDuration).toDate(),
        moment(brushDomainX[1]).subtract(brushDomainMiddleToEndDuration).add(zoomDomainMiddleToEndDuration).toDate()
      ]
    }
    if (moment(newZoomDomain.x[0]).isBefore(this.props.minDate)) {
      newZoomDomain.x = [
        this.props.minDate,
        moment(this.props.minDate).add(zoomDomainMiddleToEndDuration).add(zoomDomainMiddleToEndDuration).toDate()
      ]
    } else if (moment(newZoomDomain.x[1]).isAfter(this.props.maxDate)) {
      newZoomDomain.x = [
        moment(this.props.maxDate).subtract(zoomDomainMiddleToEndDuration).subtract(zoomDomainMiddleToEndDuration).toDate(),
        this.props.maxDate
      ]
    }
    this.props.setDatetimeZoomDomain(newZoomDomain)
  }

  componentWillReceiveProps (newProps) {
    this.updateBrushVisibleState(newProps)
    this.calcRoundedZoomDomain(newProps)
    this.checkMoveToBrushedDomain(newProps)
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
        <DomainRange>
          {`${formatTime(this.props.brushDomain.x[0])} – ${formatTime(this.props.brushDomain.x[1])}
          (${moment.duration(moment(this.props.brushDomain.x[1]).diff(this.props.brushDomain.x[0])).humanize()})`}
          <Button
            onClick={() => this.moveToBrushedDomain(this.props.brushDomain.x, this.props.zoomDomain.x)}
            visible={!this.state.isBrushVisible}>
            Jump to brush
          </Button>
        </DomainRange>
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
