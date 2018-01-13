import React from 'react'
import PropTypes from 'prop-types'
import ZoneButton from '../../../core/components/ZoneButton'
import styled from 'styled-components'

const PlusSign = styled.span`
  display: inline-block;
  font-size: 1.5em;
  margin-top: -0.1em;
`

const AddZoneButton = (props) => {
  return (
    <ZoneButton
      color='transparent'
      onClick={props.onClick}
      dottedBorder>
      <PlusSign>+</PlusSign>
    </ZoneButton>
  )
}

AddZoneButton.propTypes = {
  onClick: PropTypes.func
}

export default AddZoneButton
