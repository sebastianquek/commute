import React from 'react'
import PropTypes from 'prop-types'
import ScrollableAnchor from 'react-scrollable-anchor'
import ZoneDataRow from './ZoneDataRow'
import ZoneFeedback from './ZoneFeedback'
import SelectedZoneDataRowContent from './SelectedZoneDataRowContent'

const DestinationZonesDataRows = (props) => {
  const keys = Object.keys(props.zoneCompositions)
  if (keys.length > 0) {
    return keys.map((key, idx) => {
      const group = props.zoneCompositions[key]
      return (
        <ScrollableAnchor key={key} id={'' + key}>
          <ZoneDataRow
            zoneName={group.zoneData[0] ? group.zoneData[0].SUBZONE_N : ''}
            zoneNum={props.initialIdx + idx + 1}
            zoneColor={group.color}>
            <SelectedZoneDataRowContent
              zoneComposition={group.zoneData}
              zoneJourneys={props.zoneJourneys[key].zoneData} />
          </ZoneDataRow>
        </ScrollableAnchor>
      )
    })
  } else {
    return <ZoneFeedback
      zoneDataContainer={<ZoneDataRow />}
      feedback='Select a destination zone to see more details' />
  }
}

DestinationZonesDataRows.propTypes = {
  zoneCompositions: PropTypes.object,
  zoneJourneys: PropTypes.object,
  initialIdx: PropTypes.number
}

export default DestinationZonesDataRows
