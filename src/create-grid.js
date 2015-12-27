import R from 'ramda'

export const createGrid = (rows, cols) => {

  const length    = rows * cols
      , cells     = R.range(0, length)
      , getCoords = n => ({ col: n % cols, row: Math.floor(n / cols) })

  return {
    getCoords
  , length
  , cells
  , rows
  , cols
  }
}
