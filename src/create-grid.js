import R from 'ramda'

const createGrid = (rows, cols) => {
  const length    = rows * cols
      , cells     = R.range(0, length)
      , getCoords = n => ({ x: n % cols, y: Math.floor(n / cols) })

  return { getCoords, length, cells }
}

export default createGrid
