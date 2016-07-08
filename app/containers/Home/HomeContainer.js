import React, { PropTypes } from 'react'
import { Home } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as homeActionCreators from 'redux/modules/name'

const HomeContainer = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleName: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired
  },
  handleClick () {
    this.props.fetchAndHandleName()
  },
  componentDidMount () {
    this.props.setName()
  },
  render () {
    return (
      <Home
        handleClick={this.handleClick}
        isFetching={this.props.isFetching}
        error={this.props.error}
        name={this.props.name} />
    )
  }
})

function mapStateToProps ({name}) {
  return {
    name: name.get('name'),
    isFetching: name.get('isFetching'),
    error: name.get('error')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(homeActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
