import React from 'react'
import { Enemy } from './enemy.jsx'
import { Hero } from './hero.jsx'
import { Bullet } from './bullet.jsx'
import { Explosion } from './exposion.jsx'

export const Stage = props => {
  let {enemies, hero, heroBullets, enemyExplosions} = props.state

  return <div className="cover">

    {enemies.map(d => <Enemy
      type={ d.type }
      key={ d.key }
      top={ d.top }
      left={ d.left }
      flip={ d.flip }
      selected={ d.selected }
      didMove={ d.didMove }
      />
    )}

    {hero.map(d => <Hero
      key={ d.key }
      top={ d.top }
      left={ d.left }
      />
    )}

    {heroBullets.map(d => <Bullet
      key={ d.key }
      top={ d.top }
      left={ d.left }
      />
    )}

    {enemyExplosions.map(d => <Explosion
      key={ d.key }
      top={ d.top }
      left={ d.left }
      />
    )}

  </div>
}
