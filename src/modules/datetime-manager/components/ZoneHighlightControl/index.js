import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1.8em);
  justify-items: start;
`

const Header = styled.span`
  grid-column: 1 / span 5;
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  font-weight: bold;
  font-size: ${({theme}) => theme.typography.subHeaderSize};
  color: ${({theme}) => theme.colors.textSecondary};
  text-transform: uppercase;
  margin-bottom: 0.18em;
`

const ZoneHighlightControl = ({
  children
}) => {
  return (
    <Grid>
      <Header>Zones</Header>
      {children}
    </Grid>
  )
}

ZoneHighlightControl.propTypes = {
  children: PropTypes.node
}

export default ZoneHighlightControl
