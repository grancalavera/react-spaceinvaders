import {
  cellWidth
, cellHeight
, worldWidth
, worldHeight
, enemyGrid
} from './config'

const defaultEnemies = enemyGrid.cells.map(i => {
  let coords = enemyGrid.getCoords(i)
  return {
    key: `enemy-${ i }`
  , type: coords.y % 3
  , left: coords.x * cellWidth + cellWidth
  , top: coords.y * cellHeight
  , flip: false
  , elapsedTime: 0
  , index: i
  , beatPeriod: 1000
  , fastestBeat: 50
  , beatFasterBy: 0.2 // this really should depend on how many enemies are still alive
  }
})

const updateEnemy = (state, action) => {
  let beat = state.elapsedTime >= state.beatPeriod
    , beatFaster = state.beatPeriod > state.fastestBeat
    , e = {
        elapsedTime: beat ? 0 : state.elapsedTime + action.elapsedTime
      , flip: beat ? !state.flip : state.flip
      , beatPeriod: beatFaster ? state.beatPeriod - state.beatFasterBy : state.beatPeriod
      }

  return  Object.assign({}, state, e)
}

const enemies = (state = defaultEnemies, action) => {
  switch (action.type) {
    case 'UPDATE':
      return state.map(e => updateEnemy(e, action))
    default:
      return state
  }
}

export default enemies
