import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import SignUp from './SignUp'
import UserHome from './UserHome'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={UserHome} />
        <Route component={SignUp} />
      </Switch>
    )
  }
}

export default Routes
