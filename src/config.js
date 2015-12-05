import createGrid from './create-grid.js'

const cellWidth = 64
    , cellHeight = 64
    , rows = 7
    , cols = 11
    , worldWidth = cellWidth * cols
    , worldHeight = cellHeight * rows
    , enemyGrid = createGrid(4, 9)
    , heroSpeed = 5

export {
  cellWidth
, cellHeight
, worldWidth
, worldHeight
, enemyGrid
, heroSpeed
}
