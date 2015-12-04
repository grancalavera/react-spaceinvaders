'use strict';

const React = require('react')
    , ReactDom = require('react-dom')
    , Sprites = require('./sprites')
    , createGrid = require('./create-grid')
    , _ = require('ramda')
    , width     = 64
    , height    = 64
    , cols      = 10
    , rows      = 10
    , enemyRows = 6
    , enemyCols = 8
    , grid      = createGrid(enemyRows, enemyCols)

const enemy = (i) => {
  let coords = grid.getCoords(i)
    , key = `enemy-${coords.x}-${coords.y}`
    , type = coords.y % 3
    , left = width + coords.x  * width
    , top = coords.y * height

  return <Sprites.Enemy type={ type } key={ key } top={ top } left={ left } />
}

ReactDom.render(
  <div>
    { _.range(0, enemyCols * enemyRows).map(enemy) }
    <Sprites.Hero top={ rows * height - height } left={ cols * width / 2 - width / 2 } />
  </div>
  , document.getElementById('stage')
)

