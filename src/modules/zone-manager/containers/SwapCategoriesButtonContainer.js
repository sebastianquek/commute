import { connect } from 'react-redux'
import SwapCategoriesButton from '../components/SwapCategoriesButton'
import { swapOriginsAndDestinations } from '../actions'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
})

const mapDispatchToProps = {
  swap: swapOriginsAndDestinations
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwapCategoriesButton)
