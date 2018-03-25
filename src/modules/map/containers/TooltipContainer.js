import React from 'react'
import { connect } from 'react-redux'
import zoneData from '../../zone-data'
import zoneManager from '../../zone-manager'
import Tooltip from '../components/Tooltip'

const TooltipContainer = (props) => {
  return (
    <Tooltip {...props} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    maxDuration: zoneData.selectors.routeChoicesFilterMaxDuration(state),
    zoneIdToGroupColor: id => {
      const colorsMap = zoneManager.selectors.zoneIdsAndGroupColorsSelector(state)
      if (colorsMap.hasOwnProperty(id)) return colorsMap[id]
      return '#ddd'
    },
    zoneIdToName: zoneData.selectors.zoneNamesSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TooltipContainer)
