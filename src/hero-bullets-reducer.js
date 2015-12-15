import {
  worldHeight
, cellHeight
, cellWidth
} from './config'

import {
  UPDATE
, DESTROY_ENEMY
, FIRE_HERO
} from './actions'

const width = cellWidth / 16
    , heigth = cellHeight / 4
    , top = worldHeight - cellHeight -heigth
    , left = action => action.left + cellWidth / 2 - width / 2
    , key = () => 'bullet-' + Date.now()
    , maxTop = -heigth
    , speed = 14
    , bullet = () => ({ key: key(), top: top, width: width, heigth: heigth })

const update = (state, action) => {
  let bullet = state[0]
  if (bullet.top < maxTop) return []
  return [Object.assign({}, bullet, {top: bullet.top - speed})]
}

export const heroBullets = (state = [], action) => {
  switch (action.type) {
    case DESTROY_ENEMY:
       return []
    case FIRE_HERO:
      if (state.length) return state
      return [Object.assign(bullet(), {left: left(action)})]
    case UPDATE:
      if (!state.length) return state
      return update(state, action)
    default:
      return state
  }
}
