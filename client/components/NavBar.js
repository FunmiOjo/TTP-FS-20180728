import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { fetchLoggedInUser, logOutUser } from '../store/reducers/user'

class NavBar extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    await this.props.logOutUser()
  }

  render() {
    const { userIsLoggedIn } = this.props
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            {userIsLoggedIn ? (
              <Fragment>
                <Link to="/home">
                  <Typography>Home</Typography>
                </Link>
                <Button onClick={this.handleClick}>Log Out</Button>
              </Fragment>
            ) : (
              <Fragment>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Log In</Link>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
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
    logOutUser: () => dispatch(logOutUser()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(NavBar)
