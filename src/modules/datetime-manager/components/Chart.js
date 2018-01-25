import React from 'react'
import { VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryTooltip, createContainer } from 'victory'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import theme from '../../../utils/theme'

export const formatTime = time => moment(time).format('h.mma Do MMM')
const formatYAxisTick = value => Math.abs(Number(value))

const ChartWrapper = styled.div`
  height: 50%;
`

const VictoryZoomAndVoronoiContainer = createContainer('zoom', 'voronoi')

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
          padding={{top: 6, bottom: 20, left: 60, right: 36}}
          width={this.props.width}
          height={this.props.height}
          theme={VictoryTheme.material}
          domain={{x: [this.props.minDate, this.props.maxDate]}}
          containerComponent={
            <VictoryZoomAndVoronoiContainer
              zoomDomain={{x: this.props.zoomDomain.x, y: this.props.bottomChart ? [-this.props.maxY, 0] : [0, this.props.maxY]}}
              zoomDimension='x'
              onZoomDomainChange={this.handleZoom}
              minimumZoom={{x: moment.duration(6, 'hours').asMilliseconds()}}
              voronoiDimension='x'
              labels={(d) => `${formatTime(d.x)}: ${d.y}`}
              labelComponent={
                <VictoryTooltip
                  orientation='left'
                  cornerRadius={2}
                  dx={2}
                  flyoutStyle={{
                    fill: 'white',
                    stroke: theme.colors.borderSecondary
                  }}
                  style={{
                    fontSize: `${theme.typography.baseSize * theme.typography.chartTooltipRemRatio}px`,
                    fontFamily: `'Barlow', sans-serif`,
                    padding: 0
                  }}
                  pointerLength={5}
                  pointerWidth={10}/>
              }
            />
          }
        >
          <VictoryAxis
            dependentAxis
            label={this.props.yLabel}
            tickFormat={formatYAxisTick}
            style={{
              axis: {
                strokeWidth: 1.3
              },
              tickLabels: {
                fontSize: `${theme.typography.baseSize * theme.typography.chartAxisTicksRemRatio}px`,
                fontFamily: `'Barlow', sans-serif`
              },
              axisLabel: {
                fontSize: `${theme.typography.baseSize * theme.typography.chartAxisLabelRemRatio}px`,
                padding: 45,
                fontFamily: `'Poppins', sans-serif`,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2.1px',
                fill: theme.colors.textPrimary
              }
            }}
          />
          <VictoryAxis
            orientation={this.props.bottomChart ? 'top' : 'bottom'}
            tickFormat={formatTime}
            scale={{x: 'time'}}
            style={{
              axis: {
                strokeWidth: 1.3,
                transform: this.props.bottomChart ? 'translateY(-0.5px)' : 'translateY(0.5px)'
              },
              ticks: {
                transform: this.props.bottomChart ? 'translateY(-0.5px)' : 'translateY(0.5px)'
              },
              tickLabels: {
                padding: 3,
                fontSize: `${theme.typography.baseSize * theme.typography.chartAxisTicksRemRatio}px`,
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
