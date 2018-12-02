import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, TextField } from '@material-ui/core'
import { signUpUser } from '../store/reducers/user'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
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

  handleSubmit(event) {
    event.preventDefault()
    const { name, email, password } = this.state
    this.props.signUpUser({ name, email, password })
    console.log('handleSubmit has changed')
  }

  render() {
    const { name, email, password } = this.state
    return (
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
