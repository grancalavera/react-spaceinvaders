import createGrid from './create-grid'

import {
  cellWidth
, cellHeight
, worldWidth
, worldHeight
, cols
, rows
} from './config'

const grid = createGrid(rows - 5, cols - 2)

const defaultState = grid.cells.map(i => {
  let coords = grid.getCoords(i)
  return {
    key: `enemy-${ i }`
  , type: coords.y % 3
  , left: coords.x * cellWidth + cellWidth
  , top: coords.y * cellHeight + cellHeight
  , flip: false
  , elapsedTime: 0
  , index: i
  , beatPeriod: 500
  , fastestBeat: 50
  , beatFasterBy: 0 // this really should depend on how many enemies are still alive
  }
})

const update = (state, action) => {
  let beat = state.elapsedTime >= state.beatPeriod
    , beatFaster = state.beatPeriod > state.fastestBeat
    , e = {
        elapsedTime: beat ? 0 : state.elapsedTime + action.elapsedTime
      , flip: beat ? !state.flip : state.flip
      , beatPeriod: beatFaster ? state.beatPeriod - state.beatFasterBy : state.beatPeriod
      }
  return  Object.assign({}, state, e)
}

const enemies = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE':
      return state.map(e => update(e, action))
    default:
      return state
  }
}

export default enemies
