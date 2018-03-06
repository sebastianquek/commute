import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Subheader from '../../core/components/Subheader'
import Spinner from '../../core/components/Spinner'

const Wrapper = styled.div`
  grid-area: controls;
  display: flex;
  flex-direction: column;
`

const ButtonGroup = styled.div`
  display: flex;
`

const Button = styled.button`
  font-family: 'Barlow', sans-serif;
  background-color: transparent;
  border: 1px solid ${({theme}) => theme.colors.borderSecondary};
  border-right: none;
  cursor: pointer;
  color: ${({theme}) => theme.colors.textPrimary};
  transition: 0.2s all;
  padding: 0.3em 0.46em;
  font-size: 0.84em;

  ${({disabled}) => disabled && css`
    color: white;
    background-color: #4a90e2;
    border-color: #4a90e2;
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
    this.durations = {
      'PT30M': '30 mins',
      'PT1H': '1 hr',
      'PT2H': '2 hrs',
      'PT3H': '3 hrs'
    }
  }

  render () {
    const buttons = Object.keys(this.durations).map(key => {
      let selected = false
      if (key === this.props.step) {
        selected = true
      }
      return (
        <Button onClick={() => this.props.setStep(key)} key={key} disabled={selected}>
          {selected && this.props.isFetchingRidershipData ? <Spinner color='white'/> : this.durations[key]}
        </Button>
      )
    })

    return (
      <Wrapper>
        <Subheader>Interval</Subheader>
        <ButtonGroup>
          {buttons}
        </ButtonGroup>
      </Wrapper>
    )
  }
}

Controls.propTypes = {
  step: PropTypes.string.isRequired,
  isFetchingRidershipData: PropTypes.bool.isRequired,
  setStep: PropTypes.func.isRequired
}

export default Controls
