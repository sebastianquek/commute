import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Subheader from '../../core/components/Subheader'

const Content = styled.div`
  margin-bottom: 1em;
  font-family: 'Barlow', sans-serif;
`

const SelectedZoneDataRowContent = (props) => {
  return (
    <div>
      <Subheader>Composition</Subheader>
      <Content>
        {JSON.stringify(props.zoneComposition)}
      </Content>
      <Subheader>Routes</Subheader>
      <Content>
        {JSON.stringify(props.zoneJourneys)}
      </Content>
    </div>
  )
}

SelectedZoneDataRowContent.propTypes = {
  zoneComposition: PropTypes.object,
  zoneJourneys: PropTypes.object
}

export default SelectedZoneDataRowContent
