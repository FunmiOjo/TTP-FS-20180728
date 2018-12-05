import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Button, FormGroup, TextField } from '@material-ui/core'
import { signUpUser } from '../store/reducers/user'
import { fetchBalance } from '../store/reducers/balance'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
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
    const { name, email, password } = this.state
    await this.props.signUpUser({ name, email, password })
    await this.props.fetchBalance()
    this.setState({
      redirectToHome: true,
    })
  }

  render() {
    const { name, email, password } = this.state
    return this.state.redirectToHome ? (
      <Redirect to="/home" />
    ) : (
      <form onSubmit={this.handleSubmit}>
        <FormGroup row={false}>
          <TextField
            required
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={this.handleChange}
          />
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
    signUpUser: signUpInfo => dispatch(signUpUser(signUpInfo)),
    fetchBalance: () => dispatch(fetchBalance()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(SignUp)
