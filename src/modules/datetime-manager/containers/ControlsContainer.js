import { connect } from 'react-redux'
import { setStep, setAbsoluteRidership, setRelativeRidership } from '../actions'
import { stepSelector, isFetchingRidershipData, showAbsoluteRidershipSelector } from '../selectors'
import Controls from '../components/Controls'

const mapStateToProps = (state, ownProps) => {
  return {
    step: stepSelector(state),
    isFetchingRidershipData: isFetchingRidershipData(state),
    showAbsoluteRidership: showAbsoluteRidershipSelector(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setStep,
  setAbsoluteRidership,
  setRelativeRidership
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
