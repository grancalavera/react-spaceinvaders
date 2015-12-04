import React from 'react'
import ReactDom from 'react-dom'
import Enemy from './enemy.jsx'
import Hero from './hero.jsx'
import createGrid from './create-grid.jsx'
import R from 'ramda'

const width     = 64
    , height    = 64
    , cols      = 11
    , rows      = 10
    , enemyRows = 6
    , enemyCols = 9
    , grid      = createGrid(enemyRows, enemyCols)

function enemy(i) {
  let coords = grid.getCoords(i)
    , key = `enemy-${coords.x}-${coords.y}`
    , type = coords.y % 3
    , left = width + coords.x  * width
    , top = coords.y * height
  return <Enemy type={ type } key={ key } top={ top } left={ left } />
}

ReactDom.render(
  <div>
    { R.range(0, enemyCols * enemyRows).map(enemy) }
    <Hero top={ rows * height - height } left={ cols * width / 2 - width / 2 } />
  </div>
  , document.getElementById('stage')
)
