import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash.get'
import Subheader from '../../core/components/Subheader'
import ZoneDetails from '../../core/components/ZoneDetails'

const Section = styled.div`
  margin-bottom: 1em;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 0.2em 1em;
`

const SelectedZoneDataRowContent = (props) => {
  let temp = []
  for (let i = 0; i < props.zoneComposition.length; i++) {
    const mainDetail = get(props.zoneComposition, [i, 'zoneData', 'SUBZONE_N'], '')
    const subDetail = get(props.zoneComposition, [i, 'zoneData', 'PLN_AREA_N'], '')
    temp.push(
      <ZoneDetails key={i} mainDetail={mainDetail} subDetail={subDetail} />
    )
  }
  return (
    <div>
      <Subheader>Composition</Subheader>
      <Section>
        <Grid>
          {temp}
        </Grid>
      </Section>
    </div>
  )
}

SelectedZoneDataRowContent.propTypes = {
  zoneComposition: PropTypes.array
}

export default SelectedZoneDataRowContent
