import React from 'react'
import {Enemy} from './enemy.jsx'
import {Hero} from './hero.jsx'
import {Bullet} from './bullet.jsx'
import {Explosion} from './exposion.jsx'

export const Stage = props => {
  let {enemies, hero, heroBullets, enemyExplosions} = props

  return <div className="cover">

    {enemies.map(s => <Enemy
        type={s.type}
        key={s.key}
        top={s.top}
        left={s.left}
        flip={s.flip}
        alive={s.alive} />
    )}

    <Hero
      top={hero.top}
      left={hero.left} />

    {heroBullets.map(s => <Bullet
        key={s.key}
        top={s.top}
        left={s.left} />
    )}

    {enemyExplosions.map(s => <Explosion
        key={s.key}
        top={s.top}
        left={s.left} />
    )}

  </div>
}

