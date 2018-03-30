import { connect } from 'react-redux'
import Subgraphs from '../components/Subgraphs'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
})

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subgraphs)
