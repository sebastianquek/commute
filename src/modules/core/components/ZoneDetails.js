import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ZoneButton from '../../core/components/ZoneButton'
import color from '../../../utils/randomColor'

const Wrapper = styled.div`
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

const ZoneDetails = ({ color, mainDetail, subDetail, animate }) => {
  return (
    <Wrapper>
      <ZoneButton
        color={color}
        hover={false}
        animate={animate}
      />
      <Details>
        <MainDetail title={mainDetail}>{mainDetail}</MainDetail>
        <SubDetail title={subDetail}>{subDetail}</SubDetail>
      </Details>
    </Wrapper>
  )
}

ZoneDetails.propTypes = {
  color: PropTypes.string,
  mainDetail: PropTypes.string,
  subDetail: PropTypes.string,
  animate: PropTypes.bool
}

ZoneDetails.defaultProps = {
  color: color.next().value,
  animate: true
}

export default ZoneDetails
