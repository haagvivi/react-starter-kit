import React, { PropTypes } from 'react'

const MainContainer = React.createClass({
  propTypes: {
    children: PropTypes.object.isRequired
  },
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})

export default MainContainer
