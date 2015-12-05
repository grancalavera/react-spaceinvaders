import createGrid from './create-grid.js'

const cellWidth = 64
    , cellHeight = 64
    , rows = 10
    , cols = 11
    , worldWidth = cellWidth * cols
    , worldHeight = cellHeight * rows
    , enemyGrid = createGrid(6, 9)

export {
  cellWidth
, cellHeight
, worldWidth
, worldHeight
, enemyGrid
}
