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

const grid = createGrid(enemyRows, enemyCols)
    , hStepSize = cellWidth / 6
    , vStepSize = cellHeight / 2
    , period = 80
    , defaultState = defaultEnemyGrid()

export function enemiesGrid(state = defaultState, action) {
  switch (action.type) {
    case DESTROY_ENEMY:
      return R.reject((e => e.key == action.enemy.key), state)
     case UPDATE:
      return update(state, action)
    default:
      return state
  }
}

function update(enemies, action) {
  let { elapsedTime } = action
    , allDidMove = R.all(enemy => enemy.didMove, enemies)
    , {leftmost, rightmost} = edges(enemies)
    , atEdge = atLeftEdge(leftmost) || atRightEdge(rightmost)
    , advance = allDidMove && atEdge

  if (advance) return defaultState

  return enemies.map(enemy => {
    let age = enemy.age + elapsedTime
      , move = age >= enemy.nextMoveTime
      , nextMoveTime = move ? age + (grid.length * period) : enemy.nextMoveTime
      , left = move ? enemy.left + hStepSize * enemy.hDirection : enemy.left
      , flip = move ? !enemy.flip : enemy.flip
      , selected = enemy.key == leftmost.key || enemy.key == rightmost.key
      , didMove = move || (allDidMove ? false : enemy.didMove)

    return Object.assign({}, enemy, {
      age
    , left
    , flip
    , selected
    , nextMoveTime
    , didMove
    , didAdvance: false
    })
  })
}

function defaultEnemyGrid() {
  return grid.cells.map(enemy)
}

function enemy(i) {
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
  }
}

function atLeftEdge(enemy) {
  return enemy.left <= cellWidth / 2
}

function atRightEdge(enemy) {
  return  enemy.left >= worldWidth - cellWidth - cellWidth / 2
}

function edges(enemies) {
  return R.reduce(({leftmost, rightmost}, enemy) => {
    return {
      leftmost: !leftmost ? enemy : enemy.col < leftmost.col ? enemy : leftmost
    , rightmost: !rightmost ? enemy : enemy.col > rightmost.col ? enemy : rightmost
    }
  }, {}, enemies)
}
