import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Subheader from '../../core/components/Subheader'
import RouteChoiceChart from './RouteChoiceChart'

const Section = styled.div`
  margin-bottom: 1em;
`

const SelectedZoneDataRowContent = (props) => {
  const routes = props.zoneJourneys.reduce((routes, z) => {
    return [...routes, ...(z.zoneData || [])]
  }, [])
  return (
    <div>
      <Subheader>Routes</Subheader>
      <Section>
        {routes.length > 0 &&
          <RouteChoiceChart routes={routes} />
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
