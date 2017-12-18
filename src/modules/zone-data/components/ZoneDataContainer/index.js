import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZoneButton from '../../../core/components/ZoneButton'
import {fadeSlideUp} from '../../../../utils/animations'

const Container = styled.div`
  margin: 1.3em 1em 0.8em 1.3em;
  padding: 1em;
  border-radius: ${({theme}) => theme.borderRadius};
  border: 1px ${({dottedBorder}) => dottedBorder ? 'dashed' : 'solid'} ${({color}) => color};
  position: relative;
  animation: ${fadeSlideUp} 0.7s ease;
  min-height: 100px;
`

const ContainerLabel = styled.div`
  position: absolute;
  top: -1em;
  left: -1em;
  background-color: ${({theme}) => theme.colors.background};
  padding-right: 0.2em;
  padding-bottom: 0.2em;
`

const ZoneName = styled.span`
  text-transform: uppercase;
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  font-weight: bold;
  font-size: ${({theme}) => theme.typography.headerSize};
  margin-left: 0.5em;
  margin-right: 0.4em;
`

const ZoneDataCotainer = (props) => {
  return (
    <Container dottedBorder={props.dottedBorder} color={props.zoneColor} className={props.className}>
      <ContainerLabel>
        <ZoneButton color={props.zoneColor}>{props.zoneNum}</ZoneButton>
        {props.zoneName && <ZoneName>{props.zoneName}</ZoneName>}
      </ContainerLabel>
      {props.children}
    </Container>
  )
}

ZoneDataCotainer.propTypes = {
  children: PropTypes.node,
  zoneName: PropTypes.string,
  dottedBorder: PropTypes.bool,
  zoneColor: PropTypes.string,
  zoneNum: PropTypes.number
}

export default ZoneDataCotainer
