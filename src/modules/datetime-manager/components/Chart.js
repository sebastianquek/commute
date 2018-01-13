import React from 'react'
import { VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryZoomContainer } from 'victory'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'

const formatTimeAxisTick = time => moment(time).format('ha Do MMM')
const formatYAxisTick = value => Math.abs(Number(value))

const ChartWrapper = styled.div`
  height: 50%;
`

class Chart extends React.Component {
  constructor (props) {
    super(props)
    this.handleZoom = this.handleZoom.bind(this)
  }

  handleZoom (domain) {
    // for (let i = 0; i < 2; i++) {
    //   const newDate = new Date(domain.x[i])
    //   newDate.setMilliseconds(0)
    //   newDate.setSeconds(0)
    //   newDate.setMinutes(0)
    //   domain.x[i] = newDate
    // }
    this.props.setDatetimeZoomDomain({x: domain.x})
  }

  render () {
    return (
      <ChartWrapper>
        <VictoryChart
          padding={{top: 12, bottom: 30, left: 60, right: 36}}
          width={this.props.width}
          height={this.props.height}
          theme={VictoryTheme.material}
          domain={{x: [this.props.minDate, this.props.maxDate], y: this.props.bottomChart ? [-this.props.maxY, 0] : [0, this.props.maxY]}}
          containerComponent={
            <VictoryZoomContainer
              zoomDomain={this.props.zoomDomain}
              zoomDimension='x'
              onZoomDomainChange={this.handleZoom}
              minimumZoom={{x: moment.duration(6, 'hours').asMilliseconds()}}
            />
          }
        >
          <VictoryAxis
            dependentAxis
            label={this.props.yLabel}
            tickFormat={formatYAxisTick}
            style={{
              tickLabels: {fontFamily: `'Barlow', sans-serif`},
              axisLabel: {
                fontSize: '12px',
                padding: 45,
                fontFamily: `'Poppins', sans-serif`,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2.1px'
              }
            }}
          />
          <VictoryAxis
            orientation={this.props.bottomChart ? 'top' : 'bottom'}
            tickFormat={formatTimeAxisTick}
            scale={{x: 'time'}}
            style={{
              tickLabels: {
                padding: 10,
                fontFamily: `'Barlow', sans-serif`,
                display: this.props.bottomChart ? 'none' : 'visible'
              }
            }}
          />
          <VictoryStack>
            {this.props.children}
          </VictoryStack>
        </VictoryChart>
      </ChartWrapper>
    )
  }
}

Chart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired,
  zoomDomain: PropTypes.object.isRequired,
  yLabel: PropTypes.string.isRequired,
  maxY: PropTypes.number.isRequired,
  bottomChart: PropTypes.bool,
  setDatetimeZoomDomain: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Chart
