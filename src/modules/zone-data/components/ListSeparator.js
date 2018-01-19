import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Line = styled.div`
  margin: 1.8em 0 1.5em;
  color: ${({theme}) => theme.colors.textSecondary};
  border-bottom: 1px dashed ${({theme}) => theme.colors.borderSecondary};
  text-align: center;
`

const Text = styled.span`
  background-color: white;
  display: inline-block;
  position: relative;
  padding: 0 0.75em;
  top: 0.75em;
  font-weight: bold;
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  text-transform: uppercase;
`

const Wrapper = styled.div`
  background-color: white;
  position: sticky;
  top: -1.8em;
  z-index: 3;
  font-size: ${({theme}) => theme.typography.headerSize};
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
