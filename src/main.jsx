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
} from './config.js'
import createControls from './create-controls.js'

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
    case 'UPDATE':
    default:
      return state
  }
}

const spaceInvaders = combineReducers({
  enemies
, hero
})

const store = createStore(spaceInvaders)

const render = () => {
  ReactDom.render(<Stage world={ store.getState() } />, document.getElementById('stage'))
}

createControls(
  action => { console.log(action)}
, action => { console.log(action)}
)

render()

// expect library to make simple tests
// deep-freeze
// spread operator
// slice to generate new arrays with changes on specific indices
// Object.assign to update objects
// a reducer must return the current state for any unknown action
// in the example the store is passed to the component in the view :|
