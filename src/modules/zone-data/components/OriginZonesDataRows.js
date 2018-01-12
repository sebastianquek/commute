import React from 'react'
import PropTypes from 'prop-types'
import ScrollableAnchor from 'react-scrollable-anchor'
import ZoneDataRow from './ZoneDataRow'
import ZoneFeedback from './ZoneFeedback'

const OriginZonesDataRows = (props) => {
  if (props.originZones.length > 0) {
    return props.originZones.map((z, idx) =>
      <ScrollableAnchor key={z.id} id={'' + z.id}>
        <ZoneDataRow
          key={z.id}
          zoneName={z.SUBZONE_N}
          zoneNum={idx + 1}
          zoneColor={z.color}>
          {JSON.stringify(z)}
        </ZoneDataRow>
      </ScrollableAnchor>
    )
  } else {
    return <ZoneFeedback
      zoneDataContainer={<ZoneDataRow />}
      feedback='Select an origin zone to see more details' />
  }
}

OriginZonesDataRows.propTypes = {
  originZones: PropTypes.array
}

OriginZonesDataRows.defaultProps = {
  originZones: []
}

export default OriginZonesDataRows
