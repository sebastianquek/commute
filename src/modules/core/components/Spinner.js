import styled, { css } from 'styled-components'

// Small spinner to be used to show loading states
// Additional CSS can be injected through the extraCSS prop
export default styled.div`
  animation: rotate 0.8s infinite linear;
  border-radius: 50%;  
  border: 2px solid ${({color, theme}) => color || theme.colors.textSecondary};
  border-right-color: transparent;
  display: inline-block;
  height: 12px;
  margin: 2px;
  opacity: 1;
  width: 12px;

  ${({extraCSS}) => extraCSS && css`
    ${extraCSS}
  `}

  @keyframes rotate {
    0%    { transform: rotate(0deg); }
    100%  { transform: rotate(360deg); }
  }
`
