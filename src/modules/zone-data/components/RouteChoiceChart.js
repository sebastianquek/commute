import React from 'react'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryTheme, VictoryStack, VictoryBar, VictoryLabel } from 'victory'

const barThickness = 20
const RouteChoiceChart = (props) => {
  const keyArray = props.keys.map(({key}) => key)
  return (
    <VictoryChart
      height={(props.keys.length + 1) * barThickness + 90}
      horizontal={true}
      domainPadding={{ y: [barThickness, barThickness / 2] }}
      padding={{ top: 30, bottom: 30, left: 120 }}
    >
      <VictoryStack colorScale={'blue'}
        style={{ labels: { fill: 'white' } }}
        labelComponent={ <VictoryLabel dx={-60}/> }
      >
        {props.data.map((data, index) => {
          return (
            <VictoryBar
              key={index}
              horizontal={true}
              categories={{ y: keyArray }}
              data={props.keys.map(k => ({...k, width: barThickness}))}
              y={({key}) => data[key] ? data[key].duration : 0}
              x={({key}) => key}
              labels={({key}) => data[key] ? data[key].bus : ''}
            />
          )
        })}
      </VictoryStack>
    </VictoryChart>
  )
}

RouteChoiceChart.propTypes = {
  data: PropTypes.array,
  keys: PropTypes.array
}

export default RouteChoiceChart
