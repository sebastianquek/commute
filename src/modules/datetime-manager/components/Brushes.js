import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { VictoryChart, VictoryAxis, VictoryBrushContainer } from 'victory'
import moment from 'moment'

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
  bottom: 0;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  font-weight: bold;
  font-size: ${({theme}) => theme.typography.subHeaderSize};
  color: ${({theme}) => theme.colors.textWarning};
  opacity: ${({visible}) => visible ? 1 : 0};
  transform: ${({visible}) => visible ? 'translateY(0)' : 'translateY(-20px)'};
  transition: all 0.7s;
`

class Brushes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      roundedZoomDomainX: [],
      allowDrag: true
    }
    this.handleBrush = this.handleBrush.bind(this)
  }

  handleBrush (domain) {
    for (let i = 0; i < 2; i++) {
      domain.x[i] = this.roundToStep(domain.x[i], 'PT1H')
    }
    if (
      this.props.brushDomain.x[0].getTime() !== domain.x[0].getTime() ||
      this.props.brushDomain.x[1].getTime() !== domain.x[1].getTime()
    ) {
      this.props.setDatetimeBrushDomain(domain)
    }
  }

  componentWillReceiveProps (newProps) {
    const roundedZoomDomainX = [
      this.roundToStep(newProps.zoomDomain.x[0], 'PT1H', 'ceil'),
      this.roundToStep(newProps.zoomDomain.x[1], 'PT1H', 'floor')
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

  roundToStep (date, step = 'PT1H', direction) {
    const momentDateUnix = moment(date).unix()
    const stepSeconds = moment.duration(step).as('seconds')
    if (direction === 'floor') {
      return moment.unix(Math.floor(momentDateUnix / stepSeconds) * stepSeconds).toDate()
    } else if (direction === 'ceil') {
      return moment.unix(Math.ceil(momentDateUnix / stepSeconds) * stepSeconds).toDate()
    } else {
      return moment.unix(Math.round(momentDateUnix / stepSeconds) * stepSeconds).toDate()
    }
  }

  render () {
    return (
      <Wrapper>
        <Feedback visible={!this.state.allowDrag}>Brush panning disabled, zoom out to enable</Feedback>
        <VictoryChart
          padding={{top: 0, bottom: 0, left: 60, right: 36}}
          width={this.props.width}
          height={this.props.height / 6}
          domain={this.props.zoomDomain}
          containerComponent={
            <VictoryBrushContainer
              allowDrag={this.state.allowDrag}
              brushDomain={this.props.brushDomain}
              brushDimension='x'
              onBrushDomainChange={this.handleBrush}
              style={{height: this.props.height / 6, marginBottom: '1em'}}
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
  setDatetimeBrushDomain: PropTypes.func.isRequired
}

export default Brushes
