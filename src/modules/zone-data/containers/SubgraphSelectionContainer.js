import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import SubgraphSelection from '../components/SubgraphSelection'
import ListSeparator from '../components/ListSeparator'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const SubgraphSelectionContainer = (props) => {
  return (
    <Wrapper>
      <ListSeparator>Subgraph selection</ListSeparator>
      <SubgraphSelection {...props} />
    </Wrapper>
  )
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
})

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubgraphSelectionContainer)
