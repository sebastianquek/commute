import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Subheader from '../../core/components/Subheader'
import RouteChoiceChart from './RouteChoiceChart'

const Section = styled.div`
  margin-bottom: 1em;
`

const SelectedZoneDataRowContent = (props) => {
  // TODO: Ensure all zone data is shown
  console.log(props.zoneJourneys)
  return (
    <div>
      <Subheader>Composition</Subheader>
      <Section>
        {JSON.stringify(props.zoneComposition)}
      </Section>
      <Subheader>Routes</Subheader>
      <Section>
        {props.zoneJourneys[0].zoneData &&
          <RouteChoiceChart routes={props.zoneJourneys[0].zoneData} />
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
