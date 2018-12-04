import React, { Component } from 'react'
import { Button, FormGroup, TextField } from '@material-ui/core'
import { convertToNumber } from './utils'

class PurchaseForm extends Component {
  constructor() {
    super()
    this.state = {
      ticker: '',
      quantity: 0,
    }
    this.handleTickerChange = this.handleTickerChange.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleQuantityChange(event) {
    const num = convertToNumber(event.target.value)
    let newQuantity = !(num instanceof Error) ? num : 0

    this.setState({
      quantity: newQuantity,
    })
  }

  handleTickerChange(event) {
    this.setState({
      ticker: event.target.value,
    })
  }

  handleSubmit() {
    event.preventDefault()
    console.log('submitted')
  }

  render() {
    const { ticker, quantity } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup row={false}>
          <TextField
            required
            label="Ticker"
            name="ticker"
            type="text"
            value={ticker}
            onChange={this.handleTickerChange}
          />
          <TextField
            required
            label="Quantity"
            name="quantity"
            type="text"
            value={quantity}
            onChange={this.handleQuantityChange}
          />
          <Button type="Buy">Submit</Button>
        </FormGroup>
      </form>
    )
  }
}

export default PurchaseForm
