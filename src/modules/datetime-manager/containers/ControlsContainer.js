import { connect } from 'react-redux'
import { setStep } from '../actions'
import { stepSelector, isFetchingRidershipData } from '../selectors'
import Controls from '../components/Controls'

const mapStateToProps = (state, ownProps) => {
  return {
    step: stepSelector(state),
    isFetchingRidershipData: isFetchingRidershipData(state),
    ...ownProps
  }
}

const mapDispatchToProps = {
  setStep
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
