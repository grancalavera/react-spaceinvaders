import R from 'ramda'

export const createGrid = (rows, cols) => {

  const length    = rows * cols
      , cells     = R.range(0, length)
      , getCoords = n => ({ x: n % cols, y: Math.floor(n / cols) })
      , index     = (c, r) => c + r * rows

  return {
    getCoords
  , length
  , cells
  , rows
  , cols
  }
}
