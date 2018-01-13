import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import ZoneButton from '../../../core/components/ZoneButton'
import { shouldTextBeDark } from '../../../../utils/randomColor'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const ZoneButtonWithDelete = styled(ZoneButton)`
`

const DeleteButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: ${({color}) => color};
  opacity: 0;
  margin-left: -1.8em;
  padding: 0.2em 0.2em 0.2em 1.2em;
  border-radius: 0 ${({theme}) => theme.borderRadius} ${({theme}) => theme.borderRadius};
  font-family: inherit;
  font-weight: bold;
  transition: 0.2s all;
  display: flex;
  align-items: center;
  transform: translate(-10px, 0);

  svg {
    fill: ${({darkText, theme}) => darkText ? theme.colors.iconPrimary : theme.colors.iconPrimaryAlt};
    height: 1.2em;
    width: 1.2em;
  }

  ${ZoneButtonWithDelete}:hover + & {
    opacity: 1;
    transform: translate(8px, -1px);
  }

  :hover {
    opacity: 1;
    transform: translate(8px, 0);
  }

  :hover svg {
    fill: ${({theme}) => theme.colors.iconWarning};
  }

  :focus {
    outline: none;
  }
`

const SelectedZoneButton = (props) => {
  return (
    <Wrapper>
      <ZoneButtonWithDelete
        color={props.color}
        onClick={props.onClick}>
        {props.children}
      </ZoneButtonWithDelete>
      <DeleteButton onClick={props.onClickDelete} color={props.color} darkText={shouldTextBeDark(props.color)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M704 736v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm128 724v-948h-896v948q0 22 7 40.5t14.5 27 10.5 8.5h832q3 0 10.5-8.5t14.5-27 7-40.5zm-672-1076h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"/></svg>
      </DeleteButton>
    </Wrapper>
  )
}

SelectedZoneButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  onClickDelete: PropTypes.func,
  children: PropTypes.node
}

SelectedZoneButton.defaultProps = {
  color: '#eee'
}

export default withTheme(SelectedZoneButton)
