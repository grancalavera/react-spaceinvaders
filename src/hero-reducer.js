import {
  cellWidth
, cellHeight
, worldWidth
, worldHeight
} from './config'

const defaultHero = {
  top: worldHeight - cellHeight
, left: worldWidth / 2 - cellWidth / 2
, direction: 0
, minLeft: 0
, maxLeft: worldWidth - cellWidth
, speed: 7
}

const updateHero = (state, action) => {
  const left = (l) => {
    if (l < state.minLeft) return state.minLeft
    if (l > state.maxLeft) return state.maxLeft
    return l
  }
  return Object.assign({}, state, { left: left(state.left + state.direction * state.speed ) })
}

const hero = (state = defaultHero, action) => {
  switch (action.type) {
    case 'MOVE':
      return Object.assign({}, state, { direction: action.direction })
    case 'UPDATE':
      return updateHero(state, action)
    default:
      return state
  }
}

export default hero
