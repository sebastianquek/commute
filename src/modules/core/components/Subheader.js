import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.span`
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  font-weight: bold;
  font-size: ${({theme}) => theme.typography.subHeaderSize};
  color: ${({theme}) => theme.colors.textSecondary};
  text-transform: uppercase;
  margin-bottom: 0.3em;
`

const Subheader = ({children}) => {
  return <Wrapper>{children}</Wrapper>
}

Subheader.propTypes = {
  children: PropTypes.node
}

export default Subheader
