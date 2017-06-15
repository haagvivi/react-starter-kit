import React, { PropTypes, Component } from 'react'

class MainContainer extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

MainContainer.propTypes = {
  children: PropTypes.object.isRequired
}

export default MainContainer
