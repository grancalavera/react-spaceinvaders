import {
  cellWidth
, cellHeight
, worldWidth
, worldHeight
} from './config'

const minLeft = 0
    , maxLeft = worldWidth - cellWidth
    , speed = 7

const defaultState = {
  top: worldHeight - cellHeight
, left: worldWidth / 2 - cellWidth / 2
, speed: 0
}

const move = (state, action) => {
  return Object.assign({}, state, { speed: action.direction * speed })
}

const update = (state, action) => {
  const left = () => {
    let l = state.left + state.speed
    if (l < minLeft) return minLeft
    if (l > maxLeft) return maxLeft
    return l
  }
  return Object.assign({}, state, { left: left() })
}

const hero = (state = defaultState, action) => {
  switch (action.type) {
    case 'MOVE':
      return move(state, action)
    case 'UPDATE':
      return update(state, action)
    default:
      return state
  }
}

export default hero
