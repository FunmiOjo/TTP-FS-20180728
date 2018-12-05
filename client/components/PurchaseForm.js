import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, TextField } from '@material-ui/core'
import ErrorMessage from './ErrorMessage'
import { addPurchasedStock } from '../store/reducers/stock'
import { updateBalance } from '../store/reducers/balance'

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
      quantity: Math.floor(newQuantity),
    })
  }

  handleTickerChange(event) {
    this.setState({
      ticker: event.target.value,
    })
  }

  async handleSubmit() {
    event.preventDefault()
    try {
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

          this.props.addPurchasedStock({
            ...stockDataResponse,
            quantity: this.state.quantity,
            userId: this.props.userId,
          })

          const purchaseValue =
            stockDataResponse.latestPrice * this.state.quantity
          await this.props.updateBalance(purchaseValue)
        }
      }
    } catch (error) {
      console.error(error)
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
    balance: 5000,
    userId: state.user.loggedInUser.id,
  }
}

const mapDispatch = dispatch => {
  return {
    addPurchasedStock: stock => dispatch(addPurchasedStock(stock)),
    updateBalance: purchaseValue => dispatch(updateBalance(purchaseValue)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(PurchaseForm)
