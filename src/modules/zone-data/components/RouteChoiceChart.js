import React from 'react'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryStack, VictoryBar } from 'victory'
const RouteChoiceChart = (props) => {
  return (
    <VictoryChart horizontal={true} domainPadding={{ y: 50 }} >
      <VictoryStack colorScale={'blue'}>
        {props.data.map((data, index) => {
          return <VictoryBar key={index} horizontal={true} data={data} y='duration' x='bus' />
        })}
      </VictoryStack>
    </VictoryChart>
  )
}

RouteChoiceChart.propTypes = {
  data: PropTypes.array
}

export default RouteChoiceChart
