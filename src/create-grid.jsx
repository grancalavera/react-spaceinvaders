export default function createGrid(rows, cols) {

  return { getCoords: getCoords, length: length }

  function getCoords(n) {
    return {
        x: n % cols
      , y: Math.floor(n / cols)
    }
  }

  function length() {
    return rows * cols
  }

}
