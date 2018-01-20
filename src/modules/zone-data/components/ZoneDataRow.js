import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZoneButton from '../../core/components/ZoneButton'
import { fadeSlideUp } from '../../../utils/animations'

const Row = styled.div`
  margin: 1.3em 1em 0.8em 1.4em;
  padding: 1.3em 1em 1em 1em;
  border-radius: ${({theme}) => theme.borderRadius};
  border: 1px ${({dottedBorder}) => dottedBorder ? 'dashed' : 'solid'} ${({color}) => color};
  position: relative;
  animation: ${fadeSlideUp} 0.7s ease;
  min-height: 100px;
  transition: 0.2s all;
  word-wrap: break-word;
  color: ${({theme}) => theme.colors.textPrimary};
`

const RowLabel = styled.div`
  position: absolute;
  top: -1.15em;
  left: -1.15em;
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

class ZoneDataRow extends React.Component {
  render () {
    return (
      <Row dottedBorder={this.props.dottedBorder} color={this.props.zoneColor} className={this.props.className}>
        <RowLabel>
          <ZoneButton color={this.props.zoneColor}>{this.props.zoneNum}</ZoneButton>
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
