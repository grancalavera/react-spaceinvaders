import R from 'ramda'
import { createGrid } from './create-grid'

import {
  cellWidth
, cellHeight
, worldWidth
, worldHeight
, cols
, rows
, enemyRows
, enemyCols
} from './config'

import {
  UPDATE
, DESTROY_ENEMY
} from './actions'

const STRAFE_0 = 'STRAFE_0'
  , STRAFE_1 = 'STRAFE_1'
  , ADVANCE = 'ADVANCE'
  , grid = createGrid(enemyRows, enemyCols)
  , hStepSize = cellWidth / 6
  , vStepSize = cellHeight / 2
  , period = 80
  , defaultMeta = {
      atEdge: false
    , operation: STRAFE_0
    , operationCompleted: true
    }
  , defaultState = reduceState(getDefaultEnemy, defaultMeta, grid.cells)

export function enemiesGrid(state = defaultState, action) {
  switch (action.type) {
    case DESTROY_ENEMY:
      return destroy(state, action)
     case UPDATE:
      return update(state, action)
    default:
      return state
  }
}

function update(state, action) {
  const { elapsedTime } = action
    , operation = getNextOperation(state.meta)
    , meta = Object.assign({}, state.meta, { operation: operation })

  switch (operation) {
    case STRAFE_0:
    case STRAFE_1:
      return reduceState(strafe(elapsedTime, operation), meta, state.enemies)
    case ADVANCE:
      return reduceState(advance(elapsedTime, operation), meta, state.enemies)
    default:
      return state
  }

  // let { elapsedTime } = action
  //   , { enemies } = state
  //   , allDidMove = R.all(enemy => enemy.didMove, enemies)
  //   , {leftmost, rightmost} = getEdges(enemies)
  //   , atEdge = atLeftEdge(leftmost) || atRightEdge(rightmost)
  //   , advance = allDidMove && atEdge

  // if (advance) return getDefaultState()

  // return {
  //   enemies: enemies.map(enemy => {
  //     let age = enemy.age + elapsedTime
  //       , move = age >= enemy.nextMoveTime
  //       , nextMoveTime = move ? age + (grid.length * period) : enemy.nextMoveTime
  //       , left = move ? enemy.left + hStepSize * enemy.hDirection : enemy.left
  //       , flip = move ? !enemy.flip : enemy.flip
  //       , selected = enemy.key == leftmost.key || enemy.key == rightmost.key
  //       , didMove = move || (allDidMove ? false : enemy.didMove)

  //     return Object.assign({}, enemy, {
  //       age
  //     , left
  //     , flip
  //     , selected
  //     , nextMoveTime
  //     , didMove
  //     , didAdvance: false
  //     })
  //   })
  // }
}

function destroy(state, action) {
  return Object.assign({}, state, {
    enemies: R.reject((enemy => enemy.key == action.enemy.key), state.enemies)
  })
}

const strafe = (elapsedTime, operation) => enemy => {
  return enemy
}

const advance = (elapsedTime, operation) => enemy => {
  return enemy
}

function reduceState(map, meta, collection) {

  return R.reduce(reducer, { meta, enemies: [] }, collection)

  function reducer({meta, enemies}, item) {
    const enemy = map(item)
      , { leftmost, rightmost } = getEdges(meta, enemy)
      , atEdge = meta.atEdge || atLeftEdge(leftmost) || atRightEdge(rightmost)
      , operationCompleted = meta.operation == enemy.lastOperation

    enemies.push(enemy)

    return {
      enemies
    , meta: Object.assign({}, meta, { atEdge, operationCompleted })
    }
  }
}

function getNextOperation(meta) {
  const { operation, operationCompleted, atEdge } = meta
  if (!operationCompleted) return operation
  if (operationCompleted && !atEdge && operation == STRAFE_0) return STRAFE_1
  if (operationCompleted && !atEdge && operation == STRAFE_1) return STRAFE_0
  return ADVANCE
}

function getDefaultEnemy(i) {
  let { col, row } = grid.getCoords(i)
  return {
    row
  , col
  , key: `enemy-${ i }`
  , type: row % 3
  , flip: false
  , didMove: true
  , hDirection: 1
  , width: cellWidth
  , height: cellHeight
  , left: col * cellWidth + ((worldWidth - grid.cols * cellWidth) / 2)
  , top: grid.rows * cellHeight - row * cellHeight
  , lastOperation: STRAFE_0
  , nextMoveTime: i * period

  , age: 0
  , nextCellTime: i * period
  , nextRowTime: row * period
  , nextColTime: col * period

  }
}

function atLeftEdge(enemy) {
  return enemy.left <= cellWidth / 2
}

function atRightEdge(enemy) {
  return  enemy.left >= worldWidth - cellWidth - cellWidth / 2
}

function getEdges(meta, enemy) {
  const { leftmost, rightmost } = meta
  return Object.assign({}, meta, {
    leftmost: !leftmost ? enemy : enemy.col < leftmost.col ? enemy : leftmost
  , rightmost: !rightmost ? enemy : enemy.col > rightmost.col ? enemy : rightmost
  })
}
