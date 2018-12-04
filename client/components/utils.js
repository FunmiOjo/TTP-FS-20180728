export const convertToNumber = str => {
  const num = parseInt(str, 10)
  if (isNaN(parseInt(str, 10))) {
    return new Error('Not a number')
  } else {
    return num
  }
}
