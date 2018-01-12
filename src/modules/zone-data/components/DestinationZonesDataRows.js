import React from 'react'
import PropTypes from 'prop-types'
import ScrollableAnchor from 'react-scrollable-anchor'
import ZoneDataRow from './ZoneDataRow'
import ZoneFeedback from './ZoneFeedback'

const DestinationZonesDataRows = (props) => {
  if (props.destinationZones.length > 0) {
    return props.destinationZones.map((z, idx) =>
      <ScrollableAnchor key={z.id} id={'' + z.id}>
        <ZoneDataRow
          key={z.id}
          zoneName={z.SUBZONE_N}
          zoneNum={props.initialIdx + idx + 1}
          zoneColor={z.color}>
          {JSON.stringify(z)}
        </ZoneDataRow>
      </ScrollableAnchor>
    )
  } else {
    return <ZoneFeedback
      zoneDataContainer={<ZoneDataRow />}
      feedback='Select a destination zone to see more details' />
  }
}

DestinationZonesDataRows.propTypes = {
  destinationZones: PropTypes.array,
  initialIdx: PropTypes.number
}

DestinationZonesDataRows.defaultProps = {
  destinationZones: []
}

export default DestinationZonesDataRows
