const UPDATE_WORLD = 'UPDATE_WORLD'
const DID_UPDATE_WORLD = 'DID_UPDATE_WORLD'
const MOVE_HERO = 'MOVE_HERO'
const FIRE_HERO = 'FIRE_HERO'
const DESTROY_ENEMY = 'DESTROY_ENEMY'

const updateWorld = elapsedTime => ({
  type: UPDATE_WORLD
, elapsedTime: elapsedTime
})

const didUpdateWorld = () => ({ type: DID_UPDATE_WORLD })

export {
  UPDATE_WORLD
, DID_UPDATE_WORLD
, MOVE_HERO
, FIRE_HERO
, DESTROY_ENEMY
, updateWorld
, didUpdateWorld
}
