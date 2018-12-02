import React, { Component } from 'react'
import { Button, FormGroup, TextField } from '@material-ui/core'

class Login extends Component {
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('STATE: ', this.state)
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

export default Login
