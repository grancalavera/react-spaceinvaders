import {
  UPDATE
, DESTROY_ENEMY
} from './actions'

const addExplosion = (state, action) => {
  let {top, left} = action.enemy
    , key = `exposion-${Date.now()}`
  return {top, left, key, age: 0}
}

const update = (state, action) => {
  return state.reduce((acc, explosion) => {
    if (explosion.age >= 200) return acc
    let age = explosion.age + action.elapsedTime
    return acc.concat(Object.assign({}, explosion, {age}))
  }, [])
}

export const enemyExplosions = (state = [], action) => {
  switch (action.type) {
    case DESTROY_ENEMY:
      return state.concat(addExplosion(state, action))
    case UPDATE:
      return update(state, action)
    default:
      return state
  }
}
