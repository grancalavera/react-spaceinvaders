export const UPDATE = 'UPDATE'
export const MOVE_HERO = 'MOVE_HERO'
export const FIRE_HERO = 'FIRE_HERO'
export const DESTROY_ENEMY = 'DESTROY_ENEMY'

export const update = elapsedTime => ({
  type: UPDATE
, elapsedTime
})

export const destroyEnemy = (enemy) => ({
  type: DESTROY_ENEMY
, enemy
})

export const moveHero = (direction) => ({
  type: MOVE_HERO
, direction
})

export const fireHero = (left) => ({
  type: FIRE_HERO
, left
})
