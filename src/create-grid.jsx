export default function createGrid(rows, cols) {

  return { getCoords: getCoords }

  function getCoords(n) {
    return {
        x: n % cols
      , y: Math.floor(n / cols)
    }
  }

}
