import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import LogIn from './LogIn'
import SignUp from './SignUp'
import UserHome from './UserHome'
import { fetchLoggedInUser } from '../store/reducers/user'

class Routes extends Component {
  componentDidMount() {
    this.props.fetchLoggedInUser()
  }

  render() {
    return (
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/home" component={UserHome} />
        <Route component={SignUp} />
      </Switch>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    fetchLoggedInUser: () => dispatch(fetchLoggedInUser()),
  }
}

export default connect(
  null,
  mapDispatch
)(Routes)
