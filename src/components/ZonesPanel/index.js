import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AddZoneButton from '../AddZoneButton'
import {fadeSlideUp} from '../../animations'

const Container = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 1.6em;
  animation: ${fadeSlideUp} 0.7s ease;
  
  :last-of-type {
    margin-bottom: 0;
  }
`

const Label = styled.span`
  text-transform: uppercase;
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  font-weight: bold;
  font-size: ${({theme}) => theme.typography.subHeaderSize};
  transform: rotate(180deg);
  writing-mode: vertical-rl;
  margin: 0 0.3em 0 0;
  text-align: right;
  color: ${({theme}) => theme.colors.textSecondary}
`

const Children = styled.div`
  display: flex;
  flex-direction: column;
`

const ZonesPanel = (props) => {
  return (
    <Container>
      <Label>{props.label}</Label>
      <Children>
        {props.children}
        <AddZoneButton onClick={() => console.log('add')} />
      </Children>
    </Container>
  )
}

ZonesPanel.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node
}

export default ZonesPanel
