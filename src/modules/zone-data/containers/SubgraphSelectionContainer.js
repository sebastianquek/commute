import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import SubgraphSelection from '../components/SubgraphSelection'
import ListSeparator from '../components/ListSeparator'
import SubgraphList from '../components/SubgraphList'
import { subgraphGroupsCompositionSelector } from '../selectors'
import zoneManager from '../../zone-manager'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const SubgraphSelectionContainer = (props) => {
  return (
    <Wrapper>
      <ListSeparator>Subgraph selection</ListSeparator>
      <SubgraphSelection {...props} />
      <SubgraphList {...props} />
    </Wrapper>
  )
}

const mapStateToProps = (state, ownProps) => ({
  subgraphCompositions: subgraphGroupsCompositionSelector(state),
  isFetchingSubgraphs: zoneManager.selectors.isFetchingSubgraphsSelector(state),
  ...ownProps
})

const mapDispatchToProps = {
  requestSubgraphs: zoneManager.actions.requestSubgraphs
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubgraphSelectionContainer)
