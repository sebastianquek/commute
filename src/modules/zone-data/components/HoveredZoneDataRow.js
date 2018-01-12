import React from 'react'
import PropTypes from 'prop-types'
import ZoneDataRow from './ZoneDataRow'
import ZoneFeedback from './ZoneFeedback'

const HoveredZoneDataRow = (props) => {
  if (props.hoveredZone) {
    return (
      <ZoneDataRow
        zoneName={props.hoveredZone.SUBZONE_N}
        dottedBorder>
        {JSON.stringify(props.hoveredZone)}
      </ZoneDataRow>
    )
  } else {
    return <ZoneFeedback
      zoneDataContainer={<ZoneDataRow dottedBorder />}
      feedback='Hover over a zone to see its land use' />
  }
}

HoveredZoneDataRow.propTypes = {
  hoveredZone: PropTypes.object
}

export default HoveredZoneDataRow
