import React from 'react'
import { VictoryChart, VictoryAxis, VictoryStack, VictoryTheme } from 'victory'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'

const formatTimeAxisTick = time => moment(time).format('ha Do MMM')
const formatYAxisTick = value => Number(value)

const ChartWrapper = styled.div`
  height: 50%;
`

const Chart = (props) => {
  return (
    <ChartWrapper>
      <VictoryChart
        padding={{top: 12, bottom: 30, left: 60, right: 36}}
        width={props.width}
        height={props.height}
        theme={VictoryTheme.material}
        domain={{x: [props.minDate, props.maxDate]}}
      >
        <VictoryAxis
          dependentAxis
          label={props.yLabel}
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
          {props.children}
        </VictoryStack>
      </VictoryChart>
    </ChartWrapper>
  )
}

Chart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  yLabel: PropTypes.string,
  children: PropTypes.node
}

export default Chart
