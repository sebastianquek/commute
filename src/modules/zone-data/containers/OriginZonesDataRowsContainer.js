import React from 'react'
import { connect } from 'react-redux'
import { originZonesDataSelector } from '../selectors'
import styled from 'styled-components'
import OriginZonesDataRows from '../components/OriginZonesDataRows'
import ListSeparator from '../components/ListSeparator'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const OriginZonesDataRowsContainer = (props) => {
  return (
    <Wrapper>
      <ListSeparator>Origins</ListSeparator>
      <OriginZonesDataRows {...props} />
    </Wrapper>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    originZones: originZonesDataSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OriginZonesDataRowsContainer)
