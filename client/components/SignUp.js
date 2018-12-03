import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Button, FormGroup, TextField } from '@material-ui/core'
import { signUpUser } from '../store/reducers/user'

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

  componentDidUpdate() {
    if (this.props.loggedInUser.id) {
      console.log('User logged in')
    }
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
  }
}

export default connect(
  mapState,
  mapDispatch
)(SignUp)
