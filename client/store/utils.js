export const getIndexOfArrayWithId = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return i
    }
  }
}

export const getNewVersionOfStateWithAddedStock = (stock, portfolio) => {
  console.log('stock: ', stock, 'portfolio: ', portfolio)
  const indexOfStockInPortfolio = getIndexOfArrayWithId(portfolio, stock.id)
  if (indexOfStockInPortfolio !== undefined) {
    const newPortfolio = portfolio.slice()
    newPortfolio[indexOfStockInPortfolio].quantity = stock.quantity
    return newPortfolio
  } else {
    return [...portfolio, stock]
  }
}
