import styled from 'styled-components'

export default styled.div.attrs({
  style: ({x, y}) => ({
    top: `${y}px`,
    left: `${x}px`
  })
})`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  border-radius: 2px;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);
  font-family: Barlow, sans-serif;
  position: absolute;
  margin: 1.5em 0;
  min-width: ${({minWidth}) => minWidth || '300px'};
  color: ${({theme}) => theme.colors.textPrimary};
  background: rgba(255, 255, 255, 0.8);
  transform: translate(-50%, -6px);
  transition: all 0.15s;
  opacity: ${({hidden}) => hidden ? 0 : 1};
  visibility: ${({hidden}) => hidden ? 'hidden' : 'visible'};
  z-index: 4;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% + 6px);
    top: 0;
    width: 0; 
    height: 0; 
    border: 6px solid black;
    border-color: transparent transparent rgba(255, 255, 255, 0.8) rgba(255, 255, 255, 0.8);
    transform-origin: 0 0;
    transform: rotate(135deg);
    box-shadow: -3px 3px 10px -2px rgba(0, 0, 0, 0.3);
  }
`
