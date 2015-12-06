import {
  worldHeight
, cellHeight
, cellWidth
} from './config'

const width = cellWidth / 16
    , heigth = cellHeight / 4
    , top = worldHeight - cellHeight -heigth
    , left = action => action.left + cellWidth / 2 - width / 2

const update = (state, action) => {
  return state
}

const key = () => 'bullet-' + Date.now()

const heroBullets = (state = [], action) => {
  switch (action.type) {
    case 'FIRE':
      if (state.length) return state
      return [ { key: key(), left: left(action), top: top }]
    case 'UPDATE':
      return update(state, action)
    default:
      return state
  }
}

export default heroBullets
