import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ScrollableAnchor from 'react-scrollable-anchor'
import ZoneDataList from '../components/ZoneDataList'
import ZoneDataRow from '../components/ZoneDataRow'
import {filterNumCommuters} from '../actions'
import {currentZoneDataSelector, originZonesDataSelector, destinationZonesDataSelector} from '../selectors'

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
          zoneName={hoveredZone.SUBZONE_N}
          dottedBorder>
          {JSON.stringify(hoveredZone)}
        </ZoneDataRow>
      }
      originZonesData={originZones && originZones.map(z =>
        <ScrollableAnchor key={z.id} id={'' + z.id}>
          <ZoneDataRow
            key={z.id}
            zoneName={z.SUBZONE_N}
            zoneNum={counter++}
            zoneColor={z.color}>
            {JSON.stringify(z)}
          </ZoneDataRow>
        </ScrollableAnchor>
      )}
      destinationZonesData={destinationZones && destinationZones.map(z =>
        <ScrollableAnchor key={z.id} id={'' + z.id}>
          <ZoneDataRow
            key={z.id}
            zoneName={z.SUBZONE_N}
            zoneNum={counter++}>
            {JSON.stringify(z)}
          </ZoneDataRow>
        </ScrollableAnchor>
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
    hoveredZone: currentZoneDataSelector(state),
    originZones: originZonesDataSelector(state),
    destinationZones: destinationZonesDataSelector(state),
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
