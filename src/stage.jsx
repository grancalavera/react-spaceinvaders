import React from 'react'
import R from 'ramda'
import createGrid from './create-grid.jsx'
import Enemy from './enemy.jsx'
import Hero from './hero.jsx'

export default function Stage(props) {

  let world = props.world
    , enemyGrid = createGrid(world.enemyRows, world.enemyCols)
    , heroTop = world.rows * world.height - world.height
    , heroLeft = world.cols * world.width / 2 - world.width / 2

  return <div>
    { R.range(0, world.enemyCols * world.enemyRows).map(enemy) }
    <Hero top={ heroTop } left={ heroLeft } />
  </div>

  function enemy(i) {
    let coords = enemyGrid.getCoords(i)
      , key = `enemy-${coords.x}-${coords.y}`
      , type = coords.y % 3
      , left = world.width + coords.x  * world.width
      , top = coords.y * world.height

    return <Enemy type={ type } key={ key } top={ top } left={ left } />
  }
}
