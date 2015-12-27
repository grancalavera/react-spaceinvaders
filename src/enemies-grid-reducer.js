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

const MOVE_0 = 'MOVE_0'
    , MOVE_1 = 'MOVE_1'
    , ADVANCE = 'ADVANCE'
    , grid = createGrid(enemyRows, enemyCols)
    , hStepSize = cellWidth / 6
    , vStepSize = cellHeight / 2
    , period = 80
    , defaultMeta = {
        leftmost: null
      , rightmost: null
      , atEdge: false
      , operation: MOVE_0
      , operationCompleted: true
      }

export function enemiesGrid(state = getDefaultState(), action) {
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
  return getDefaultState()
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

function getDefaultState() {
  return grid.cells.reduce(({meta, enemies}, i) => {
    const enemy = getDefaultEnemy(i)
        , { leftmost, rightmost, action } = getEdges(meta, enemy)
        , atEdge = meta.atEdge || atLeftEdge(leftmost) || atRightEdge(rightmost)
        , operationCompleted = meta.operation == enemy.lastOperation
    return {
      enemies: enemies.concat(enemy)
    , meta: Object.assign({}, meta,
        {
          leftmost
        , rightmost
        , atEdge
        , operationCompleted
        }
      )
    }
  }, { meta: defaultMeta, enemies: [] })
}

function getDefaultEnemy(i) {
  let { col, row } = grid.getCoords(i)
  return {
    row
  , col
  , key: `enemy-${ i }`
  , type: row % 3
  , flip: false
  , age: 0
  , didMove: true
  , hDirection: 1
  , nextMoveTime: i * period
  , width: cellWidth
  , height: cellHeight
  , left: col * cellWidth + ((worldWidth - grid.cols * cellWidth) / 2)
  , top: grid.rows * cellHeight - row * cellHeight
  , lastOperation: MOVE_0
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

