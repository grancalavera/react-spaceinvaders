import React from 'react'
import Enemy from './enemy.jsx'
import Hero from './hero.jsx'

export default function Stage(props) {
  let hero = props.world.hero
    , enemies = props.world.enemies

  return <div>
    { enemies.map(e => <Enemy type={ e.type } key={ e.key } top={ e.top } left={ e.left } /> )}
    <Hero top={ hero.top } left={ hero.left } />
  </div>
}
