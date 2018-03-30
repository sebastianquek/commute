import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import ZoneButton from '../../core/components/ZoneButton'
import color from '../../../utils/randomColor'

const Wrapper = styled.div`
  display: flex;
  margin-left: ${({small}) => small ? '-0.5em' : '0'};
  margin-bottom: ${({small}) => small ? '-0.2em' : '0'};
  margin-top: ${({small}) => small ? '-0.2em' : '0'};
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  letter-spacing: 0.05em;
  margin-left: ${({small}) => small ? '0' : '0.2em'};
  white-space: nowrap;
  overflow: hidden;
`

const MainDetail = styled.div`
  font-weight: ${({small}) => small ? 600 : 700};
  font-size: ${({small}) => small ? '0.98em' : '1.1em'};
  margin-bottom: -0.05em;

  ${({wrap}) => wrap && css`
    white-space: pre-wrap;
    line-height: 1.05;
    margin: 0.2em 0;
  `}
`

const SubDetail = styled.div`
  font-size: 0.75em;
`

const ZoneDetails = ({ color, mainDetail, subDetail, animate, small, wrap }) => {
  return (
    <Wrapper small={small}>
      <ZoneButton
        color={color}
        hover={false}
        animate={animate}
        small={small}
      />
      <Details small={small}>
        <MainDetail title={mainDetail} small={small} wrap={wrap}>{mainDetail}</MainDetail>
        <SubDetail title={subDetail}>{subDetail}</SubDetail>
      </Details>
    </Wrapper>
  )
}

ZoneDetails.propTypes = {
  color: PropTypes.string,
  mainDetail: PropTypes.string,
  subDetail: PropTypes.string,
  animate: PropTypes.bool,
  small: PropTypes.bool,
  wrap: PropTypes.bool
}

ZoneDetails.defaultProps = {
  color: color.next().value,
  animate: true,
  small: false,
  wrap: false
}

export default ZoneDetails
