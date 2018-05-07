import { connect } from 'react-redux'
import Subgraphs from '../components/Subgraphs'
import { subgraphGroupDataSelector } from '../selectors'

const mapStateToProps = (state, ownProps) => ({
  groups: subgraphGroupDataSelector(state),
  ...ownProps
})

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subgraphs)
