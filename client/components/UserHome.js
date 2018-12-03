import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class UserHome extends Component {
  render() {
    const { name } = this.props.loggedInUser
    return <div>Hello {name}</div>
  }
}

const mapState = state => {
  return {
    loggedInUser: state.user.loggedInUser,
  }
}

export default withRouter(
  connect(
    mapState,
    null
  )(UserHome)
)
