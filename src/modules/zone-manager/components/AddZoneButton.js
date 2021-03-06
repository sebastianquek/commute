import React from 'react'
import PropTypes from 'prop-types'
import ZoneButton from '../../core/components/ZoneButton'
import styled from 'styled-components'

const PlusSign = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0.2rem;
  
  path {
    fill: ${({theme}) => theme.colors.textPrimary};
  }
`

const AddZoneButton = (props) => {
  return (
    <ZoneButton
      color='transparent'
      onClick={props.onClick}
      title='Add groups'
      circle
      dottedBorder>
      <PlusSign>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512">
          <path d="M416 277.3H277.3V416h-42.7V277.3H96v-42.7h138.7V96h42.7v138.7H416V277.3z"/>
        </svg>
      </PlusSign>
    </ZoneButton>
  )
}

AddZoneButton.propTypes = {
  onClick: PropTypes.func
}

export default AddZoneButton
