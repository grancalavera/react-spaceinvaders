import React from 'react'
import Enemy from './enemy.jsx'
import Hero from './hero.jsx'
import Bullet from './bullet.jsx'

const Stage = props => {

  let hero = props.world.hero
    , enemies = props.world.enemies
    , heroBullets = props.world.heroBullets

  return <div className="cover">
    { enemies.map(e => <Enemy type={ e.type } key={ e.key } top={ e.top } left={ e.left } flip={ e.flip } /> )}
    <Hero top={ hero.top } left={ hero.left } />
    { heroBullets.map(b => <Bullet key={ b.key } top={ b.top } left={ b.left }/> )}
  </div>
}

export default Stage
