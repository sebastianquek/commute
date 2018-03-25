import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: ${({theme}) => theme.colors.textSecondary};
  font-family: 'Poppins', sans-serif;
  font-size: ${({theme}) => theme.typography.subHeaderSize};
  font-weight: bold;
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  margin-bottom: 0.4em;
  text-transform: uppercase;
`

const Subheader = ({children}) => {
  return <Wrapper>{children}</Wrapper>
}

Subheader.propTypes = {
  children: PropTypes.node
}

export default Subheader
