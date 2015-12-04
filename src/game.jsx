import React from 'react'
import ReactDom from 'react-dom'
import Stage from './stage.jsx'
import R from 'ramda'
import createGrid from './create-grid.jsx'

ReactDom.render(<Stage world={ world() } />, document.getElementById('stage'))

function world() {
  let cellWidth = 64
    , cellHeight = 64
    , cols = 11
    , rows = 10
    , enemyRows = 6
    , enemyCols = 9
    , enemyGrid = createGrid(enemyRows, enemyCols)
    , hero =
      {
        top: rows * cellHeight - cellHeight
      , left: cols * cellWidth / 2 - cellWidth / 2
      }
    , enemies = R.range(0, enemyGrid.length()).map(enemy)

  return { hero: hero, enemies: enemies }

  function enemy(i) {
    let coords = enemyGrid.getCoords(i)
    return {
      key: `enemy-${coords.x}-${coords.y}`
    , type: coords.y % 3
    , left: coords.x * cellWidth + cellWidth
    , top: coords.y * cellHeight
    }
  }
}
