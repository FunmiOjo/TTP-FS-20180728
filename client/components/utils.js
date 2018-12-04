import axios from 'axios'

export const convertToNumber = str => {
  const num = parseInt(str, 10)
  if (isNaN(parseInt(str, 10))) {
    return new Error('Not a number')
  } else {
    return num
  }
}

export const getStockData = async symbol => {
  try {
    const { data } = await axios.get(
      `https://api.iextrading.com/1.0/stock/${symbol}/quote`
    )
    return data
  } catch (error) {
    return error
  }
}

export const purchaseValueGreaterThanBalance = ({
  price,
  quantity,
  balance,
}) => {
  return price * quantity <= balance
}
