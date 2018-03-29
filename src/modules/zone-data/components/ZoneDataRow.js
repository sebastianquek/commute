import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZoneButton from '../../core/components/ZoneButton'
import { fadeSlideUp } from '../../../utils/animations'

const Row = styled.div`
  animation: ${fadeSlideUp} 0.7s ease;
  border-radius: ${({theme}) => theme.borderRadius};
  border: 1px ${({dottedBorder}) => dottedBorder ? 'dashed' : 'solid'} ${({color}) => color};
  color: ${({theme}) => theme.colors.textPrimary};
  font-family: 'Barlow', sans-serif;
  margin: 1.8em 1em 0.8em 1.4em;
  min-height: 100px;
  padding: 1.6em 1em 1em 1em;
  position: relative;
  transition: 0.2s all;
  word-wrap: break-word;
`

const RowLabel = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  left: -1.4em;
  padding-bottom: 0.2em;
  padding-right: 0.2em;
  position: absolute;
  top: -1.4em;
`

const ZoneName = styled.span`
  color: ${({theme}) => theme.colors.textPrimary};
  font-family: 'Poppins', sans-serif;
  font-size: ${({theme}) => theme.typography.headerSize};
  font-weight: bold;
  letter-spacing: ${({theme}) => theme.typography.headerLetterSpacing};
  margin-left: 0.5em;
  margin-right: 0.4em;
  text-transform: uppercase;
`

class ZoneDataRow extends React.Component {
  render () {
    return (
      <Row dottedBorder={this.props.dottedBorder} color={this.props.zoneColor} className={this.props.className}>
        <RowLabel>
          <ZoneButton color={this.props.zoneColor} hover={false}>{this.props.zoneNum}</ZoneButton>
          {this.props.zoneName && <ZoneName>{this.props.zoneName}</ZoneName>}
        </RowLabel>
        {this.props.children}
      </Row>
    )
  }
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
