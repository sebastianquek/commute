import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fadeSlideUp } from '../../../utils/animations'
import SubgraphGroupButtonContainer from '../containers/SubgraphGroupButtonContainer'

const Container = styled.div`
  animation: ${fadeSlideUp} 0.7s ease;
  display: flex;
  position: relative;
  margin-bottom: 2em;
`

const Label = styled.span`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: ${({theme}) => theme.typography.subHeaderSize};
  font-weight: bold;
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  margin: 0 0.3em 0 0;
  text-align: right;
  text-transform: uppercase;
  transform: rotate(180deg);
  writing-mode: vertical-rl;
`

const Children = styled.div`
  display: flex;
  flex-direction: column;
`

class Subgraphs extends React.Component {
  componentDidUpdate () {
    this.props.updateScrollbarVisbility()
  }

  render () {
    const groupComponents = this.props.groups.map((group, idx) =>
      <SubgraphGroupButtonContainer
        key={group.groupId}
        groupId={group.groupId}
        color={group.color}
        hidden={group.hidden}>
        {String.fromCharCode('A'.charCodeAt() + idx)}
      </SubgraphGroupButtonContainer>
    )
    return (
      <Container>
        <Label>Subgraphs</Label>
        <Children>
          {groupComponents}
        </Children>
      </Container>
    )
  }
}

Subgraphs.propTypes = {
  groups: PropTypes.array,
  updateScrollbarVisbility: PropTypes.func
}

Subgraphs.defaultProps = {
}

export default Subgraphs
