import React from 'react'
import Typography from '@material-ui/core/Typography'

const ErrorMessage = props => {
  return (
    <div>
      <Typography>{props.message}</Typography>
    </div>
  )
}

export default ErrorMessage
