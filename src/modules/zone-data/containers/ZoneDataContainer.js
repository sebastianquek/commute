import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ZoneDataList from '../components/ZoneDataList'
import ZoneDataRow from '../components/ZoneDataRow'
import {filterNumCommuters} from '../actions'

const ZoneDataContainer = ({
  hoveredZone,
  originZones,
  destinationZones
}) => {
  let counter = 1
  return (
    <ZoneDataList
      hoveredZoneData={hoveredZone &&
        <ZoneDataRow
          zoneName={hoveredZone.name}
          dottedBorder>
          Land composition here
        </ZoneDataRow>
      }
      originZonesData={originZones && originZones.map(z =>
        <ZoneDataRow
          key={z.id}
          zoneName={z.name}
          zoneNum={counter++}
          zoneColor={z.color}>
          Data here
        </ZoneDataRow>
      )}
      destinationZonesData={destinationZones && destinationZones.map(z =>
        <ZoneDataRow
          key={z.id}
          zoneName={z.name}
          zoneNum={counter++}>
          Data here
        </ZoneDataRow>
      )}
    />
  )
}

ZoneDataContainer.propTypes = {
  hoveredZone: PropTypes.object,
  originZones: PropTypes.array,
  destinationZones: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
  return {
    hoveredZone: null,
    originZones: null,
    destinationZones: null,
    ...ownProps
  }
}

const mapDispatchToProps = {
  filterNumCommuters
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZoneDataContainer)
