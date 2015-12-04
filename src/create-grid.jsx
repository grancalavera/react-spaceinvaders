export default function createGrid(rows, cols) {

  return { getCoords: getCoords, length: rows * cols }

  function getCoords(n) {
    return {
        x: n % cols
      , y: Math.floor(n / cols)
    }
  }
}
