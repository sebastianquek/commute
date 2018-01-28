import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fadeSlideDown } from '../../../utils/animations'
import ZoneButton from '../../core/components/ZoneButton'

const Wrapper = styled.div`
  padding: 1em 1.4em;
  background: white;
  border-radius: 0 0 ${({theme}) => `${theme.borderRadius} ${theme.borderRadius}`};
  position: fixed;
  left: 120px;
  display: flex;
  align-items: center;
  animation: ${fadeSlideDown} 0.7s;
  border: 1px solid ${({theme}) => theme.colors.borderSecondary};
  border-top: none;
`

const Feedback = styled.span`
  color: ${({theme}) => theme.colors.textPrimary};
  font-weight: bold;
  font-size: 1.2em;
  margin-right: 1em;
`

const Button = styled.button`
  cursor: pointer;
  font-family: inherit;
`

const SelectionModeFeedback = ({zoneSelectionMode, editingGroup, resetSelectionMode}) => {
  let feedback
  switch (zoneSelectionMode) {
    case 'origins':
      feedback = 'Selecting origin zones'
      break
    case 'destinations':
      feedback = 'Selecting destination zones'
      break
    case 'edit':
      feedback = (
        <span>
          <span style={{marginRight: '0.2em'}}>Editing</span>
          <ZoneButton hover={false} animate={false} color={editingGroup.color}>{editingGroup.groupId}</ZoneButton>
        </span>
      )
      break
    default:
      feedback = ''
  }

  return (
    <Wrapper>
      <Feedback>{feedback}</Feedback>
      <Button onClick={resetSelectionMode}>Done</Button>
    </Wrapper>
  )
}

SelectionModeFeedback.propTypes = {
  zoneSelectionMode: PropTypes.string,
  editingGroup: PropTypes.object,
  resetSelectionMode: PropTypes.func.isRequired
}

export default SelectionModeFeedback
