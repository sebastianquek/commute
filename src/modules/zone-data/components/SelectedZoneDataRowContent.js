import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Subheader from '../../core/components/Subheader'

const Section = styled.div`
  margin-bottom: 1em;
`

const SelectedZoneDataRowContent = (props) => {
  return (
    <div>
      <Subheader>Composition</Subheader>
      <Section>
        {JSON.stringify(props.zoneComposition)}
      </Section>
      <Subheader>Routes</Subheader>
      <Section>
        {JSON.stringify(props.zoneJourneys)}
      </Section>
    </div>
  )
}

SelectedZoneDataRowContent.propTypes = {
  zoneComposition: PropTypes.object,
  zoneJourneys: PropTypes.object
}

export default SelectedZoneDataRowContent
