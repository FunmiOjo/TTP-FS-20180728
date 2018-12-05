import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Balance from './Balance'

class UserHome extends Component {
  render() {
    const { name } = this.props.loggedInUser
    const { balance } = this.props
    return (
      <div>
        <div>Hello {name}</div>
        <Balance balance={balance} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    loggedInUser: state.user.loggedInUser,
    balance: state.balance.amount,
  }
}

export default withRouter(
  connect(
    mapState,
    null
  )(UserHome)
)
