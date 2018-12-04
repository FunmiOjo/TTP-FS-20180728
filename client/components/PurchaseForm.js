import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, TextField } from '@material-ui/core'
import ErrorMessage from './ErrorMessage'
import {
  convertToNumber,
  getStockData,
  purchaseValueGreaterThanBalance,
} from './utils'

class PurchaseForm extends Component {
  constructor() {
    super()
    this.state = {
      ticker: '',
      quantity: 0,
      tickerErrorStatus: false,
      insufficientFundsErrorStatus: false,
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

  async handleSubmit() {
    event.preventDefault()
    const stockDataResponse = await getStockData(this.state.ticker)

    if (stockDataResponse instanceof Error) {
      console.log('Error')
      this.setState({
        tickerErrorStatus: true,
      })
    } else {
      this.setState({
        tickerErrorStatus: false,
      })
      if (
        purchaseValueGreaterThanBalance({
          price: stockDataResponse.latestPrice,
          quantity: this.state.quantity,
          balance: this.props.balance,
        })
      ) {
        this.setState({
          insufficientFundsErrorStatus: true,
        })
      } else {
        this.setState({
          insufficientFundsErrorStatus: false,
        })
      }

      console.log('stockDataResponse', stockDataResponse)
    }
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
          {this.state.tickerErrorStatus && (
            <ErrorMessage message="Please enter a valid ticker." />
          )}
          {this.state.insufficientFundsErrorStatus && (
            <ErrorMessage message="You do not have sufficient funds to make this purchase." />
          )}
        </FormGroup>
      </form>
    )
  }
}

const mapState = state => {
  return {
    balance: state.user.loggedInUser.balance,
  }
}

export default connect(
  mapState,
  null
)(PurchaseForm)
