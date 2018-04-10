import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fadeSlideDown } from '../../../utils/animations'
import ZoneButton from '../../core/components/ZoneButton'

const Wrapper = styled.div`
  align-items: center;
  animation: ${fadeSlideDown} 0.7s;
  background: white;
  border-radius: 0 0 ${({theme}) => `${theme.borderRadius} ${theme.borderRadius}`};
  border: 1px solid ${({theme}) => theme.colors.borderSecondary};
  border-top: none;
  display: flex;
  left: 120px;
  padding: 1em 1.4em;
  position: fixed;
`

const Feedback = styled.span`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: 1.2em;
  font-weight: bold;
  margin-right: 1em;
`

const Meta = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.88em;
  font-weight: 400;

  kbd {
    background-color: #e1e3e5;
    border-radius: 3px;
    border: 1px solid #adb3b9;
    box-shadow: 0 1px 0 rgba(12,13,14,0.2), 0 0 0 2px #FFF inset;
    display: inline-block;
    font-family: Consolas, monospace;
    font-size: 0.86em;
    line-height: 1.4;
    margin: 0.3em 0.4em 0.3em 0.1em;
    padding: 0.16em 0.6em;
    white-space: nowrap;
  }
`

const Button = styled.button`
  cursor: pointer;
  font-family: inherit;
`

// Shows the current selection mode and additional helpful information
// A button is also created to reset the selection mode
const SelectionModeFeedback = ({zoneSelectionMode, editingGroup, editingGroupCounter, resetSelectionMode}) => {
  let feedback
  switch (zoneSelectionMode) {
    case 'origins':
      feedback = (
        <div>
          <span>Selecting origin zones</span>
          <Meta><kbd>Shift</kbd> + click to group zones</Meta>
        </div>
      )
      break
    case 'destinations':
      feedback = (
        <div>
          <span>Selecting destination zones</span>
          <Meta><kbd>Shift</kbd> + click to group zones</Meta>
        </div>
      )
      break
    case 'edit':
      feedback = (
        <span>
          <span style={{marginRight: '0.2em'}}>Editing</span>
          <ZoneButton hover={false} animate={false} color={editingGroup.color} circle={true}>{editingGroupCounter}</ZoneButton>
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
  editingGroupCounter: PropTypes.number,
  resetSelectionMode: PropTypes.func.isRequired
}

export default SelectionModeFeedback
