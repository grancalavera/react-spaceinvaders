import React from 'react'
import ReactDom from 'react-dom'
import Stage from './stage.jsx'
import createGrid from './create-grid.js'
import { createStore, combineReducers } from 'redux'
import {
  cellWidth
, cellHeight
, worldWidth
, worldHeight
, enemyGrid
, heroSpeed
} from './config.js'
import createControls from './create-controls.js'
import createGameLoop from './create-game-loop.js'

const defaultEnemies = enemyGrid.cells.map(i => {
  let coords = enemyGrid.getCoords(i)
  return {
    key: `enemy-${ i }`
  , type: coords.y % 3
  , left: coords.x * cellWidth + cellWidth
  , top: coords.y * cellHeight
  }
})

const defaultHero = {
  top: worldHeight - cellHeight
, left: worldWidth / 2 - cellWidth / 2
, direction: 0
}

const enemies = (state = defaultEnemies, action) => {
  switch (action.type) {
    case 'UPDATE':
    default:
      return state
  }
}

const hero = (state = defaultHero, action) => {
  switch (action.type) {
    case 'MOVE':
      return Object.assign({}, state, { direction: action.direction })
    case 'UPDATE':
      return Object.assign({}, state, { left: state.left + state.direction * heroSpeed })
    default:
      return state
  }
}

const dirty = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE':
      return true
    case 'DID_UPDATE':
      return false
    default:
      return state
  }
}

const spaceInvaders = combineReducers({
  enemies
, hero
, dirty
})

const store = createStore(spaceInvaders)

const render = () => {
  ReactDom.render(<Stage world={ store.getState() } />, document.getElementById('stage'))
}

createControls(store.dispatch)
createGameLoop(store.dispatch)

store.subscribe(() => {
  if (store.getState().dirty) {
    store.dispatch({type: 'DID_UPDATE'})
    render()
  }
})
render()

// expect library to make simple tests
// deep-freeze
// spread operator
// slice to generate new arrays with changes on specific indices
// Object.assign to update objects
// a reducer must return the current state for any unknown action
// in the example the store is passed to the component in the view :|

// move sets the hero to move, but does not render
