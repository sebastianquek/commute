import React from 'react'
import { connect } from 'react-redux'
import ZoneDataList from '../components/ZoneDataList'
import { fetchZoneJourneys } from '../actions'

const ZoneDataListContainer = (props) => {
  return (
    <ZoneDataList {...props} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
}

const mapDispatchToProps = {
  fetchZoneJourneys
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZoneDataListContainer)
