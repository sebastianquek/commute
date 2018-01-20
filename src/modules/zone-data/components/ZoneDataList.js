import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ListSeparator from './ListSeparator'
import HoveredZoneDataRowContainer from '../containers/HoveredZoneDataRowContainer'
import OriginZonesDataRowsContainer from '../containers/OriginZonesDataRowsContainer'
import DestinationZonesDataRowsContainer from '../containers/DestinationZonesDataRowsContainer'

const List = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border-left: 1px solid ${({theme}) => theme.colors.borderSecondary};
  display: flex;
  flex-direction: column;
  padding: 0.3em;
  min-height: 100vh;
  width: 500px;
  transition: 0.2s all;
  background: white;
  z-index: 2;
`

class ZoneDataList extends React.Component {
  componentDidMount () {
    this.props.fetchZoneJourneys()
  }

  render () {
    return (
      <List>
        <HoveredZoneDataRowContainer />
        <OriginZonesDataRowsContainer />
        <DestinationZonesDataRowsContainer />
      </List>
    )
  }
}

ZoneDataList.propTypes = {
  fetchZoneJourneys: PropTypes.func.isRequired
}

export default ZoneDataList
