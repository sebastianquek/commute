import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Label = styled.div`
  width: 100%;
  margin: 1.8em 0 1.5em;
  text-align: center;
  font-weight: bold;
  font-size: ${({theme}) => theme.typography.headerSize};
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  text-transform: uppercase;
  color: ${({theme}) => theme.colors.textSecondary};
  background-color: white;
  position: relative;
  border-bottom: 1px dashed ${({theme}) => theme.colors.borderSecondary};
`

const Text = styled.span`
  background-color: white;
  display: inline-block;
  position: relative;
  padding: 0 0.75em;
  top: 0.75em;
`

const ListSeparator = ({children}) => {
  return (
    <Label>
      <Text>{children}</Text>
    </Label>
  )
}

ListSeparator.propTypes = {
  children: PropTypes.string
}

export default ListSeparator
