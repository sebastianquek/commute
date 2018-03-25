import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SelectedGroupButtonContainer from '../containers/SelectedGroupButtonContainer'
import AddZoneButton from './AddZoneButton'
import { fadeSlideUp } from '../../../utils/animations'

const Container = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 2em;
  animation: ${fadeSlideUp} 0.7s ease;
  
  :last-of-type {
    margin-bottom: 0;
  }
`

const Label = styled.span`
  text-transform: uppercase;
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  font-weight: bold;
  font-size: ${({theme}) => theme.typography.subHeaderSize};
  transform: rotate(180deg);
  writing-mode: vertical-rl;
  margin: 0 0.3em 0 0;
  text-align: right;
  color: ${({theme}) => theme.colors.textSecondary};
`

const Children = styled.div`
  display: flex;
  flex-direction: column;
`

class GroupCategory extends React.Component {
  componentDidUpdate () {
    this.props.updateScrollbarVisbility()
  }

  render () {
    const groupComponents = this.props.groups.map((group, idx) =>
      <SelectedGroupButtonContainer
        key={group.groupId}
        groupId={group.groupId}
        color={group.color}>
        {this.props.initialIdx + idx + 1}
      </SelectedGroupButtonContainer>
    )
    return (
      <Container>
        <Label>{this.props.category}</Label>
        <Children>
          {groupComponents}
          <AddZoneButton onClick={this.props.onClickAdd} />
        </Children>
      </Container>
    )
  }
}

GroupCategory.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string.isRequired,
  initialIdx: PropTypes.number,
  onClickAdd: PropTypes.func.isRequired,
  updateScrollbarVisbility: PropTypes.func
}

GroupCategory.defaultProps = {
  initialIdx: 0
}

export default GroupCategory
