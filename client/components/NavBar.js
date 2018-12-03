import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { logOutUser } from './store/reducers/user'

const NavBar = () => {}

class NavBar extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.logOutUser()
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link to="/home">
              <Typography>Home</Typography>
            </Link>
            <Button onClick={this.handleClick}>Log Out</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    logOutUser: () => logOutUser(),
  }
}

export default connect(
  null,
  mapDispatch
)(NavBar)
