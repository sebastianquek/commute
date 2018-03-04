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
        let { transport_services: services, durations, count, destination_zone: exitZone } = d
        if (exitZone) {
          const key = `${z.zoneId}-${exitZone}-${services}`
          keys.push({key, count})
          data.push(
            <div key={key}>
              y: {count} people exited in {exitZone}, x: {services.join('-')}, {durations.join('/')}
            </div>
          )
          for (let i = 0; i < services.length; i++) {
            if (!chartData[i]) chartData[i] = {}
            chartData[i][key] = {
              service: services[i],
              duration: parseFloat(durations[i])
            }
          }
        }
      })
    }
  })
  return (
    <div>
      <Subheader>Composition</Subheader>
      <Section>
        {JSON.stringify(props.zoneComposition)}
      </Section>
      <Subheader>Routes</Subheader>
      <Section>
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
