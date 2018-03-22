import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { groupsJourneyDataSelector, zoneNamesSelector } from '../selectors'
import zoneManager from '../../zone-manager'
import ListSeparator from '../components/ListSeparator'
import RouteChoices from '../components/RouteChoices'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const RouteChoicesContainer = (props) => {
  return (
    <Wrapper>
      <ListSeparator>Route choices</ListSeparator>
      <RouteChoices {...props} />
    </Wrapper>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    routes: groupsJourneyDataSelector(state),
    zoneIdToGroupColor: zoneManager.selectors.zoneIdsAndGroupColorsSelector(state),
    zoneIdToName: zoneNamesSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteChoicesContainer)
