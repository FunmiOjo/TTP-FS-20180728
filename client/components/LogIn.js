import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Button, FormGroup, TextField } from '@material-ui/core'
import { logInUser } from '../store/reducers/user'
import { fetchBalance } from '../store/reducers/balance'

class LogIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      redirectToHome: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { email, password } = this.state
    await this.props.logInUser({ email, password })
    await this.props.fetchBalance()
    this.setState({
      redirectToHome: true,
    })
  }

  render() {
    const { email, password } = this.state
    return this.state.redirectToHome ? (
      <Redirect to="/home" />
    ) : (
      <form onSubmit={this.handleSubmit}>
        <FormGroup row={false}>
          <TextField
            required
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
          />
          <TextField
            required
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <Button type="submit">Submit</Button>
        </FormGroup>
      </form>
    )
  }
}

const mapState = state => {
  return {
    loggedInUser: state.user.loggedInUser,
    signUpError: state.user.signUpError,
  }
}

const mapDispatch = dispatch => {
  return {
    logInUser: logInInfo => dispatch(logInUser(logInInfo)),
    fetchBalance: () => dispatch(fetchBalance()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(LogIn)
