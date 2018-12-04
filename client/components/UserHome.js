import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Balance from './Balance'

class UserHome extends Component {
  render() {
    const { name, balance } = this.props.loggedInUser
    return (
      <div>
        <div>Hello {name}</div>
        <Balance accountBalance={balance} />
      </div>
    )
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
