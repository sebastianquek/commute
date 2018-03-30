import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZoneButton from '../../core/components/ZoneButton'
import { shouldTextBeDark } from '../../../utils/randomColor'

const Wrapper = styled.div`
  align-items: center;  
  display: flex;
`

const ZoneButtonWithDelete = styled(ZoneButton)`
`

const OptionButtons = styled.div`
  align-items: center;
  background-color: ${({color}) => color};
  border-radius: 0 ${({theme}) => theme.borderRadius} ${({theme}) => theme.borderRadius};
  display: flex;
  margin-left: -1.8em;
  margin-right: 1.8em;
  opacity: 0;
  padding: 0.2em 0.2em 0.2em 1.2em;
  transform: translate(-10px, 0);
  transition: 0.2s all;

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
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  margin: 0;
  padding: 0 0.2em;

  svg {
    fill: ${({darkText, theme}) => darkText ? theme.colors.iconPrimary : theme.colors.iconPrimaryAlt};
    height: 1.3em;
    width: 1.3em;
  }

  :focus {
    outline: none;
  }
`

const HideButton = OptionButton.extend`
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
        title="Scroll to subgraph group's information"
        onClick={() => props.onClick(props.subgraphGroupId)}
        dottedBorder={props.hidden}
        roundedSquare>
        {props.children}
      </ZoneButtonWithDelete>
      <OptionButtons color={props.color}>
        <HideButton
          onClick={() => props.onClickHide(props.subgraphGroupId)}
          darkText={shouldTextBeDark(props.color)}
          title={props.hidden ? 'Show' : 'Hide'}
        >
          { props.hidden
            ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 128c-81.9 0-145.7 48.8-224 128 67.4 67.7 124 128 224 128 99.9 0 173.4-76.4 224-126.6C428.2 198.6 354.8 128 256 128zM256 347.3c-49.4 0-89.6-41-89.6-91.3 0-50.4 40.2-91.3 89.6-91.3s89.6 41 89.6 91.3C345.6 306.4 305.4 347.3 256 347.3z"/><path d="M256 224c0-7.9 2.9-15.1 7.6-20.7 -2.5-0.4-5-0.6-7.6-0.6 -28.8 0-52.3 23.9-52.3 53.3 0 29.4 23.5 53.3 52.3 53.3s52.3-23.9 52.3-53.3c0-2.3-0.2-4.6-0.4-6.9 -5.5 4.3-12.3 6.9-19.8 6.9C270.3 256 256 241.7 256 224z"/></svg>
            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M376.4 158.3L448 86.6 425.4 64l-77.6 77.6C320 127.7 289.5 119 256 119c-81.9 0-145.7 52.2-224 137 34.8 37.4 66.8 72.7 103.3 98.1L64 425.4 86.6 448l76.9-76.9c27 13.7 57 21.9 92.5 21.9 99.9 0 173.4-81.8 224-135.5C452 223.4 417.6 185.7 376.4 158.3zM166.4 256c0-50.4 40.2-91.3 89.6-91.3 19.3 0 37.2 6.2 51.8 16.9l-50.7 50.7c-0.7-2.6-1.1-5.4-1.1-8.3 0-7.9 2.9-15.1 7.6-20.7 -2.5-0.4-5-0.6-7.6-0.6 -28.8 0-52.3 23.9-52.3 53.3 0 8.6 2 16.8 5.6 24L182 307.4C172.2 292.7 166.4 275 166.4 256zM256 347.3c-19.3 0-37.2-6.2-51.8-16.9l27.4-27.4c7.3 4 15.6 6.2 24.4 6.2 28.8 0 52.3-23.9 52.3-53.3 0-2.3-0.2-4.6-0.4-6.9 -5.5 4.3-12.3 6.9-19.8 6.9 -2.9 0-5.6-0.4-8.3-1.1l50.3-50.3c9.8 14.6 15.6 32.3 15.6 51.4C345.6 306.4 305.4 347.3 256 347.3z"/></svg>
          }
        </HideButton>
        <DeleteButton
          onClick={() => props.onClickDelete(props.subgraphGroupId)}
          darkText={shouldTextBeDark(props.color)}
          title='Delete'
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M443.6 387.1L312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4 -3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 68.3c-2.6-2.6-6.1-4-9.8-4 -3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1L256 313.1l130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8C447.7 393.2 446.2 389.7 443.6 387.1z"/>
          </svg>
        </DeleteButton>
      </OptionButtons>
    </Wrapper>
  )
}

SelectedGroupButton.propTypes = {
  subgraphGroupId: PropTypes.number,
  color: PropTypes.string,
  hidden: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onClickHide: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  children: PropTypes.node
}

SelectedGroupButton.defaultProps = {
  color: '#eee',
  hidden: true
}

export default SelectedGroupButton
