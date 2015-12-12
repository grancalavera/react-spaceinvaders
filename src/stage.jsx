import React from 'react'
import Enemy from './enemy.jsx'
import Hero from './hero.jsx'
import Bullet from './bullet.jsx'
import Explosion from './exposion.jsx'

const Stage = props => {

// this should just be a single sprite list

  let hero = props.world.hero
    , enemies = props.world.enemies
    , heroBullets = props.world.heroBullets
    , enemyExplosions = props.world.enemyExplosions

  return <div className="cover">

    { enemies.map(e => <Enemy
        type={ e.type }
        key={ e.key }
        top={ e.top }
        left={ e.left }
        flip={ e.flip }
        alive={ e.alive } />
    )}

    <Hero
      top={ hero.top }
      left={ hero.left } />

    { heroBullets.map(b => <Bullet
        key={ b.key }
        top={ b.top }
        left={ b.left }/>
    )}

    { enemyExplosions.map(e => <Explosion
        key={ e.key }
        top={ e.top }
        left={ e.left } />
    )}

  </div>
}

export default Stage
