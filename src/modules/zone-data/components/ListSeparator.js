import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Line = styled.div`
  border-bottom: 1px dashed ${({theme}) => theme.colors.borderSecondary};
  color: ${({theme}) => theme.colors.textSecondary};
  margin: 1.8em 0 1.5em;
  text-align: center;
`

const Text = styled.span`
  background-color: white;
  display: inline-block;
  font-weight: bold;
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  padding: 0 0.75em;
  position: relative;
  text-transform: uppercase;
  top: 0.75em;
`

const Wrapper = styled.div`
  background-color: white;
  font-size: ${({theme}) => theme.typography.headerSize};
  position: sticky;
  top: -1.8em;
  z-index: 3;
`

const ListSeparator = ({children}) => {
  return (
    <Wrapper>
      <Line>
        <Text>{children}</Text>
      </Line>
    </Wrapper>
  )
}

ListSeparator.propTypes = {
  children: PropTypes.string
}

export default ListSeparator
