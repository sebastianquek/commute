import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZoneButton from '../../../core/components/ZoneButton'
import {fadeSlideUp} from '../../../../utils/animations'

const Row = styled.div`
  margin: 1.3em 1em 0.8em 1.3em;
  padding: 1em;
  border-radius: ${({theme}) => theme.borderRadius};
  border: 1px ${({dottedBorder}) => dottedBorder ? 'dashed' : 'solid'} ${({color}) => color};
  position: relative;
  animation: ${fadeSlideUp} 0.7s ease;
  min-height: 100px;
  color: ${({theme}) => theme.colors.textPrimary};
`

const RowLabel = styled.div`
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
  color: ${({theme}) => theme.colors.textPrimary};
  margin-left: 0.5em;
  margin-right: 0.4em;
`

const ZoneDataRow = ({
  className,
  children,
  zoneName,
  dottedBorder,
  zoneColor,
  zoneNum
}) => {
  return (
    <Row dottedBorder={dottedBorder} color={zoneColor} className={className}>
      <RowLabel>
        <ZoneButton color={zoneColor}>{zoneNum}</ZoneButton>
        {zoneName && <ZoneName>{zoneName}</ZoneName>}
      </RowLabel>
      {children}
    </Row>
  )
}

ZoneDataRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  zoneName: PropTypes.string,
  dottedBorder: PropTypes.bool,
  zoneColor: PropTypes.string,
  zoneNum: PropTypes.number
}

export default ZoneDataRow
