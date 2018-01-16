import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { VictoryChart, VictoryAxis, VictoryBrushContainer } from 'victory'

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

class Brushes extends React.Component {
  constructor (props) {
    super(props)
    this.handleBrush = this.handleBrush.bind(this)
  }

  handleBrush (domain) {
    for (let i = 0; i < 2; i++) {
      const newDate = new Date(domain.x[i])
      newDate.setMilliseconds(0)
      newDate.setSeconds(0)
      newDate.setMinutes(0)
      domain.x[i] = newDate
    }
    if (
      (this.props.brushDomain.x[0].getTime() !== domain.x[0].getTime() ||
      this.props.brushDomain.x[1].getTime() !== domain.x[1].getTime()) &&
      (domain.x[0].getTime() >= this.props.minDate.getTime() && domain.x[0].getTime() <= this.props.maxDate.getTime() &&
      domain.x[1].getTime() >= this.props.minDate.getTime() && domain.x[1].getTime() <= this.props.maxDate.getTime())
    ) {
      this.props.setDatetimeBrushDomain(domain)
    }
  }

  componentWillReceiveProps (newProps) {
    // ensure the brush domain is always within the zoom domain
  }

  render () {
    return (
      <Wrapper>
        <VictoryChart
          padding={{top: 0, bottom: 0, left: 60, right: 36}}
          width={this.props.width}
          height={this.props.height / 6}
          domain={this.props.zoomDomain}
          containerComponent={
            <VictoryBrushContainer
              brushDomain={this.props.brushDomain}
              brushDimension='x'
              onBrushDomainChange={this.handleBrush}
              style={{height: this.props.height / 6, marginBottom: '1em'}}
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
