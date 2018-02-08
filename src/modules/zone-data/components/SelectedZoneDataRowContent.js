import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Subheader from '../../core/components/Subheader'
import RouteChoiceChart from './RouteChoiceChart'

const Section = styled.div`
  margin-bottom: 1em;
`

const SelectedZoneDataRowContent = (props) => {
  const data = []
  const chartData = []
  const keys = []
  props.zoneJourneys.forEach(z => {
    if (z.zoneData) {
      z.zoneData.forEach(d => {
        let { buses, durations, count, journey_exit_zone: exitZone } = d
        buses = buses.map(bus => `${bus.slice(0, -1)}(${bus.slice(-1)})`)
        if (exitZone) {
          const key = `${z.zoneId}-${exitZone}-${buses}`
          keys.push({key})
          data.push(
            <div key={key}>
              y: {count} people exited in {exitZone}, x: {buses.join('-')}, {durations.join('/')}
            </div>
          )
          for (let i = 0; i < buses.length; i++) {
            if (!chartData[i]) chartData[i] = {}
            chartData[i][key] = {
              bus: buses[i],
              duration: parseFloat(durations[i])
            }
          }
        }
      })
    }
  })
  // console.log(chartData)
  return (
    <div>
      <Subheader>Composition</Subheader>
      <Section>
        {JSON.stringify(props.zoneComposition)}
      </Section>
      <Subheader>Routes</Subheader>
      <Section>
        {keys.length}
        {chartData.length > 0 &&
          <RouteChoiceChart keys={keys} data={chartData}/>
        }
      </Section>
    </div>
  )
}

SelectedZoneDataRowContent.propTypes = {
  zoneComposition: PropTypes.array,
  zoneJourneys: PropTypes.array
}

export default SelectedZoneDataRowContent
