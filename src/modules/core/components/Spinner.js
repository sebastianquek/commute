import styled, { css } from 'styled-components'

export default styled.div`
  display: inline-block;
  height: 12px;
  width: 12px;
  margin: 2px;
  animation: rotate 0.8s infinite linear;
  border: 2px solid ${({color, theme}) => color || theme.colors.textSecondary};
  border-right-color: transparent;
  border-radius: 50%;
  opacity: 1;

  ${({extraCSS}) => extraCSS && css`
    ${extraCSS}
  `}

  @keyframes rotate {
    0%    { transform: rotate(0deg); }
    100%  { transform: rotate(360deg); }
  }
`
