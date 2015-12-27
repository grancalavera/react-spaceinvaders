import React from 'react'
import { Enemy } from './enemy.jsx'
import { Hero } from './hero.jsx'
import { Bullet } from './bullet.jsx'
import { Explosion } from './exposion.jsx'
import { worldWidth, worldHeight } from './config'

export const Stage = props => {
  let {enemiesGrid, hero, heroBullets, enemyExplosions} = props.state

  return <div className="stage" style={{width: worldWidth, height: worldHeight}}>

    {enemiesGrid.map(d => <Enemy
      key={ d.key }
      top={ d.top }
      left={ d.left }
      type={ d.type }
      flip={ d.flip }
      selected={ d.selected }
      didMove={ d.didMove }
      didAdvane={ d.didAdvane }
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
