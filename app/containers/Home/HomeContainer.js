import React, { PropTypes, Component } from 'react'
import { Home } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as homeActionCreators from 'redux/modules/name'

class HomeContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleClick () {
    this.props.fetchAndHandleName()
  }

  componentDidMount () {
    this.props.setName()
  }

  render () {
    return (
      <Home
        handleClick={() => this.handleClick()}
        isFetching={this.props.isFetching}
        error={this.props.error}
        name={this.props.name}
      />
    )
  }
}

HomeContainer.propTypes = {
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleName: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired
}

HomeContainer.defaultProps = {}

const mapStateToProps = ({name}) => ({
  name: name.get('name'),
  isFetching: name.get('isFetching'),
  error: name.get('error')
})

const mapDispatchToProps = (dispatch) => bindActionCreators(homeActionCreators, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
