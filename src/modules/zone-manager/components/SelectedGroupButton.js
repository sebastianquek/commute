import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZoneButton from '../../core/components/ZoneButton'
import { shouldTextBeDark } from '../../../utils/randomColor'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const ZoneButtonWithDelete = styled(ZoneButton)`
`

const OptionButtons = styled.div`
  background-color: ${({color}) => color};
  opacity: 0;
  margin-left: -1.8em;
  margin-right: 1.8em;
  padding: 0.2em 0.2em 0.2em 1.2em;
  border-radius: 0 ${({theme}) => theme.borderRadius} ${({theme}) => theme.borderRadius};
  transition: 0.2s all;
  display: flex;
  align-items: center;
  transform: translate(-10px, 0);

  ${ZoneButtonWithDelete}:hover + & {
    opacity: 1;
    transform: translate(8px, -1px);
  }

  :hover {
    opacity: 1;
    transform: translate(8px, 0);
  }
`

const OptionButton = styled.button`
  cursor: pointer;
  border: none;
  margin: 0;
  padding: 0 0.2em;
  background: transparent;
  display: flex;
  align-items: center;

  svg {
    fill: ${({darkText, theme}) => darkText ? theme.colors.iconPrimary : theme.colors.iconPrimaryAlt};
    height: 1.3em;
    width: 1.3em;
  }

  :focus {
    outline: none;
  }
`

const EditButton = OptionButton.extend`
  :hover svg {
    fill: ${({theme}) => theme.colors.iconEdit};
  }
`

const DeleteButton = OptionButton.extend`
  :hover svg {
    fill: ${({theme}) => theme.colors.iconWarning};
  }
`

const SelectedGroupButton = (props) => {
  return (
    <Wrapper>
      <ZoneButtonWithDelete
        color={props.color}
        title="Scroll to group's information"
        onClick={() => props.onClick(props.groupId)}>
        {props.children}
      </ZoneButtonWithDelete>
      <OptionButtons color={props.color}>
        <EditButton onClick={() => props.onClickEdit(props.groupId)} darkText={shouldTextBeDark(props.color)} title='Edit'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M888 1184l116-116-152-152-116 116v56h96v96h56zm440-720q-16-16-33 1l-350 350q-17 17-1 33t33-1l350-350q17-17 1-33zm80 594v190q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-14 14-32 8-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-126q0-13 9-22l64-64q15-15 35-7t20 29zm-96-738l288 288-672 672h-288v-288zm444 132l-92 92-288-288 92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68z"/></svg>
        </EditButton>
        <DeleteButton onClick={() => props.onClickDelete(props.groupId)} darkText={shouldTextBeDark(props.color)} title='Delete'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M443.6 387.1L312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4 -3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 68.3c-2.6-2.6-6.1-4-9.8-4 -3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1L256 313.1l130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8C447.7 393.2 446.2 389.7 443.6 387.1z"/></svg>
        </DeleteButton>
      </OptionButtons>
    </Wrapper>
  )
}

SelectedGroupButton.propTypes = {
  groupId: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  children: PropTypes.node
}

SelectedGroupButton.defaultProps = {
  color: '#eee'
}

export default SelectedGroupButton
