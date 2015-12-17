import R from 'ramda'
import { createGrid } from './create-grid'

import {
  cellWidth
, cellHeight
, worldWidth
, worldHeight
, cols
, rows
} from './config'

import {
  UPDATE
, DESTROY_ENEMY
} from './actions'

const grid = createGrid(5, cols - 4)
const hStepSize = cellWidth / 4
const vStepSize = cellHeight

const defaultState = grid.cells.map(i => {

  let {x, y} = grid.getCoords(i)

  return {

    key: `enemy-${ i }`
  , type: y % 3
  , flip: false
  , age: 0
  , index: i

  , period: 500

  , hDirection: 1
  , vDirection: 0
  , nextMoveTime: i * 100

  // this really should depend on how many enemies are still alive
  // and beatPeriod and beatFasterBy are two aspects of the same property
  , nextAnimateTime: 0

  , width: cellWidth
  , height: cellHeight
  , row: y
  , col: x
  , left: x * cellWidth + cellWidth * 2
  , top: grid.rows * cellHeight - y * cellHeight
  }
})

const farLeft   = enemy => enemy.left <= hStepSize
const farRight  = enemy => enemy.left >= worldWidth - hStepSize

const update = (state, action) => {

  let {leftmost, rightmost} = state.reduce(({leftmost, rightmost}, enemy) => {
    return {
      leftmost: !leftmost ? enemy : enemy.col < leftmost.col ? enemy : leftmost
    , rightmost: !rightmost ? enemy : enemy.col > rightmost.col ? enemy : rightmost
    }
  }, {})

  let farEdge = farLeft(leftmost) || farRight(rightmost)
    , vDirection = farEdge ? 1 : 0
    , hDirection = farEdge ? leftmost.hDirection * -1 : leftmost.hDirection

  // the beat period should be calculated here
  // where we can count all the enemies

  return state.map(enemy => {
    let age             = enemy.age + action.elapsedTime

      , animate         = age >= enemy.nextAnimateTime
      , nextAnimateTime = animate ? age + enemy.period : enemy.nextAnimateTime


      , move            = age >= enemy.nextMoveTime
      , nextMoveTime    = move ? age + enemy.period * 5: enemy.nextMoveTime

      , top             = move ? enemy.top + vStepSize * vDirection : enemy.top
      , left            = move ? enemy.left + hStepSize * hDirection : enemy.left
      , selected        = (enemy.key == leftmost.key) || (enemy.key == rightmost.key)
      , flip            = animate ? !enemy.flip : enemy.flip

    return  Object.assign(
      {}
    , enemy
    , {
        age
      , left
      , top
      , flip
      , selected

      , nextAnimateTime
      , nextMoveTime
      , vDirection
      , hDirection
      }
    )
  })
}

export const enemies = (state = defaultState, action) => {
  switch (action.type) {
    case DESTROY_ENEMY:
      return R.reject((e => e.key == action.enemy.key), state)
     case UPDATE:
      return update(state, action)
    default:
      return state
  }
}

const maxAge = 200

const addExplosion = (state, action) => {
  let {top, left} = action.enemy
    , key = `exposion-${Date.now()}`
  return {top, left, key, age: 0}
}

const updateEplosions = (state, action) => {
  return state.reduce((acc, explosion) => {
    if (explosion.age >= maxAge) return acc
    let age = explosion.age + action.elapsedTime
    return acc.concat(Object.assign({}, explosion, {age}))
  }, [])
}

export const enemyExplosions = (state = [], action) => {
  switch (action.type) {
    case DESTROY_ENEMY:
      return state.concat(addExplosion(state, action))
    case UPDATE:
      return updateEplosions(state, action)
    default:
      return state
  }
}
