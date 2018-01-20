import React from 'react'
import PropTypes from 'prop-types'
import ScrollableAnchor from 'react-scrollable-anchor'
import ZoneDataRow from './ZoneDataRow'
import ZoneFeedback from './ZoneFeedback'
import SelectedZoneDataRowContent from './SelectedZoneDataRowContent'

const DestinationZonesDataRows = (props) => {
  if (props.zoneCompositions.length > 0) {
    return props.zoneCompositions.map((z, idx) =>
      <ScrollableAnchor key={z.id} id={'' + z.id}>
        <ZoneDataRow
          key={z.id}
          zoneName={z.SUBZONE_N}
          zoneNum={props.initialIdx + idx + 1}
          zoneColor={z.color}>
          <SelectedZoneDataRowContent
            zoneComposition={z}
            zoneJourneys={props.zoneJourneys[idx]} />
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
  zoneCompositions: PropTypes.array,
  zoneJourneys: PropTypes.array,
  initialIdx: PropTypes.number
}

export default DestinationZonesDataRows
