import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import LogIn from './LogIn'
import Portfolio from './Portfolio'
import SignUp from './SignUp'
import UserHome from './UserHome'
import { fetchLoggedInUser } from '../store/reducers/user'
import { fetchBalance } from '../store/reducers/balance'

class Routes extends Component {
  async componentDidMount() {
    await this.props.fetchLoggedInUser()
    await this.props.fetchBalance()
  }

  render() {
    const { userIsLoggedIn } = this.props
    return (
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        {userIsLoggedIn && (
          <Switch>
            <Route path="/home" component={UserHome} />
            <Route path="/portfolio" component={Portfolio} />
          </Switch>
        )}
        <Route component={SignUp} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    userIsLoggedIn: !!state.user.loggedInUser.id,
  }
}

const mapDispatch = dispatch => {
  return {
    fetchLoggedInUser: () => dispatch(fetchLoggedInUser()),
    fetchBalance: () => dispatch(fetchBalance()),
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
)
