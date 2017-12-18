import React from 'react'
import PropTypes from 'prop-types'
import ZoneButton from '../../../core/components/ZoneButton'

const AddZoneButton = (props) => {
  return (
    <ZoneButton
      color='transparent'
      onClick={props.onClick}
      dottedBorder>
      +
    </ZoneButton>
  )
}

AddZoneButton.propTypes = {
  onClick: PropTypes.func
}

export default AddZoneButton
