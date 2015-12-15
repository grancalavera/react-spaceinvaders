import {
  cellWidth
, cellHeight
, worldWidth
, worldHeight
} from './config'

import {
  UPDATE
, MOVE_HERO
} from './actions'

export const getHero = state => state[0]
const minLeft = 0
    , maxLeft = worldWidth - cellWidth
    , speed = 7

const defaultState = [{
  top: worldHeight - cellHeight
, left: worldWidth / 2 - cellWidth / 2
, speed: 0
, key: `hero-${Date.now()}`
}]

const move = (state, action) => {
  return [Object.assign({}, getHero(state), { speed: action.direction * speed })]
}

const update = (state, action) => {
  let h = getHero(state)
  let left = () => {
    let l = h.left + h.speed
    if (l < minLeft) return minLeft
    if (l > maxLeft) return maxLeft
    return l
  }
  return [Object.assign({}, h, { left: left() })]
}

export const hero = (state = defaultState, action) => {
  switch (action.type) {
    case MOVE_HERO:
      return move(state, action)
    case UPDATE:
      return update(state, action)
    default:
      return state
  }
}
