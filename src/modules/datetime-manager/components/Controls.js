import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Subheader from '../../core/components/Subheader'
import Spinner from '../../core/components/Spinner'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: controls;
`

const ButtonGroup = styled.div`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: 1.6em;
  }
`

const Button = styled.button`
  background-color: transparent;
  border: 1px solid ${({theme}) => theme.colors.borderSecondary};
  border-right: none;
  color: ${({theme}) => theme.colors.textPrimary};
  cursor: pointer;
  font-family: 'Barlow', sans-serif;
  font-size: 0.84em;
  padding: 0.3em 0.46em;
  transition: 0.2s all;

  ${({disabled}) => disabled && css`
    background-color: #4a90e2;
    border-color: #4a90e2;
    color: white;
    cursor: auto;
  `}

  ${({disabled}) => !disabled && css`
    :hover {
      box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 10px 0;
      transform: translate(0, -1px);
    }
  `}

  :first-child {
    border-radius: ${({theme}) => theme.borderRadius} 0 0 ${({theme}) => theme.borderRadius};
  }

  :last-child {
    border-radius: 0 ${({theme}) => theme.borderRadius} ${({theme}) => theme.borderRadius} 0;
    border-right: 1px solid ${({theme}) => theme.colors.borderSecondary};
  }
`

class Controls extends React.Component {
  constructor (props) {
    super(props)

    // Map ISO 8601 durations to readable text
    this.durations = {
      'PT30M': '30 mins',
      'PT1H': '1 hr',
      'PT2H': '2 hrs',
      'PT3H': '3 hrs'
    }
  }

  render () {
    const buttons = Object.keys(this.durations).map(key => {
      let isSelected = key === this.props.step
      return (
        <Button
          onClick={() => this.props.setStep(key)}
          key={key}
          disabled={isSelected}
        >
          {isSelected && this.props.isFetchingRidershipData ? <Spinner color='white'/> : this.durations[key]}
        </Button>
      )
    })

    return (
      <Wrapper>
        <Subheader>Interval</Subheader>
        <ButtonGroup>
          {buttons}
        </ButtonGroup>
        <Subheader>Ridership values</Subheader>
        <ButtonGroup>
          <Button
            onClick={() => this.props.setAbsoluteRidership()}
            disabled={this.props.showAbsoluteRidership}
          >
            Absolute
          </Button>
          <Button
            onClick={() => this.props.setRelativeRidership()}
            disabled={!this.props.showAbsoluteRidership}
          >
            Relative
          </Button>
        </ButtonGroup>
      </Wrapper>
    )
  }
}

Controls.propTypes = {
  step: PropTypes.string.isRequired,
  isFetchingRidershipData: PropTypes.bool.isRequired,
  showAbsoluteRidership: PropTypes.bool.isRequired,
  setStep: PropTypes.func.isRequired,
  setAbsoluteRidership: PropTypes.func.isRequired,
  setRelativeRidership: PropTypes.func.isRequired
}

export default Controls
