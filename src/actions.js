export const UPDATE_WORLD = 'UPDATE_WORLD'
export const DID_UPDATE_WORLD = 'DID_UPDATE_WORLD'
export const MOVE_HERO = 'MOVE_HERO'
export const FIRE_HERO = 'FIRE_HERO'
export const DESTROY_ENEMY = 'DESTROY_ENEMY'

export const updateWorld = elapsedTime => ({
  type: UPDATE_WORLD
, elapsedTime: elapsedTime
})

export const didUpdateWorld = () => ({
  type: DID_UPDATE_WORLD
})

export const destroyEnemy = (enemy) => ({
  type: DESTROY_ENEMY
, enemy :enemy
})

export const moveHero = (direction) => ({
  type: MOVE_HERO
, direction: direction
})

export const fireHero = () => ({
  type: FIRE_HERO
})
