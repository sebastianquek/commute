import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryBrushContainer } from 'victory'

const ChartWrapper = styled.div`
  height: 50%;
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const formatTimeAxisTick = time => moment(time).format('ha Do MMM')
const formatYAxisTick = value => Number(value)

class BrushedChartWrapper extends React.Component {
  render () {
    return (
      <ChartWrapper>
        <VictoryChart
          padding={{top: 12, bottom: 30, left: 60, right: 36}}
          width={this.props.width}
          height={this.props.height}
          theme={VictoryTheme.material}
          domain={{x: [this.props.minDate, this.props.maxDate]}}
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
            tickFormat={formatTimeAxisTick}
            scale={{x: 'time'}}
            style={{tickLabels: {fontFamily: `'Barlow', sans-serif`}}}
          />
          <VictoryStack>
            {this.props.children}
          </VictoryStack>
        </VictoryChart>
        <Overlay>
          <VictoryChart
            padding={{top: 12, bottom: 30, left: 60, right: 36}}
            width={this.props.width}
            height={this.props.height}
            domain={{x: [this.props.minDate, this.props.maxDate]}}
            containerComponent={
              <VictoryBrushContainer
                brushDomain={this.props.brushDomain}
                brushDimension="x"
                onBrushDomainChange={this.props.handleBrush}
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
              style={{axis: {opacity: 0}}}
            />
          </VictoryChart>
        </Overlay>
      </ChartWrapper>
    )
  }
}

BrushedChartWrapper.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  brushDomain: PropTypes.object,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  handleBrush: PropTypes.func,
  yLabel: PropTypes.string,
  children: PropTypes.node
}

export default BrushedChartWrapper
