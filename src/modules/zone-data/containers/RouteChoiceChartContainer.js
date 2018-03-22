import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { groupsJourneyDataSelector } from '../selectors'
import ListSeparator from '../components/ListSeparator'
import { RouteChoiceChart } from '../components/RouteChoiceChart'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const RouteChoiceChartContainer = (props) => {
  return (
    <Wrapper>
      <ListSeparator>Route choices</ListSeparator>
      <RouteChoiceChart {...props} />
    </Wrapper>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    journeys: groupsJourneyDataSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteChoiceChartContainer)
