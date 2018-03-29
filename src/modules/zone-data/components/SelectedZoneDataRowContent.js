import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash.get'
import Subheader from '../../core/components/Subheader'
import ZoneButton from '../../core/components/ZoneButton'
import color from '../../../utils/randomColor'

const Section = styled.div`
  margin-bottom: 1em;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 0.2em 1em;
`

const GridElement = styled.div`
  display: flex;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  letter-spacing: 0.05em;
  margin-left: 0.2em;
  white-space: nowrap;
  overflow: hidden;
`

const MainDetail = styled.div`
  font-weight: 700;
  font-size: 1.1em;
  margin-bottom: -0.05em;
`

const SubDetail = styled.div`
  font-size: 0.75em;
`

const SelectedZoneDataRowContent = (props) => {
  let temp = []
  for (let i = 0; i < props.zoneComposition.length; i++) {
    const mainDetail = get(props.zoneComposition, [i, 'zoneData', 'SUBZONE_N'], '')
    const subDetail = get(props.zoneComposition, [i, 'zoneData', 'PLN_AREA_N'], '')
    temp.push(
      <GridElement key={i}>
        <ZoneButton
          color={color.next().value}
          hover={false}
        />
        <Details>
          <MainDetail title={mainDetail}>{mainDetail}</MainDetail>
          <SubDetail title={subDetail}>{subDetail}</SubDetail>
        </Details>
      </GridElement>
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
