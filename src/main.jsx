import React from 'react'
import ReactDom from 'react-dom'
import { createStore, combineReducers } from 'redux'
import hero from './hero-reducer'
import enemies from './enemies-reducer'
import heroBullets from './hero-bullets-reducer'
import dirty from './update-reducer'
import createControls from './create-controls'
import createGameLoop from './create-game-loop'
import Stage from './stage.jsx'

const spaceInvaders = combineReducers({
  enemies
, hero
, heroBullets
, dirty
})

const store = createStore(spaceInvaders)

const render = () => {
  ReactDom.render(<Stage world={ store.getState() } />, document.getElementById('stage'))
}

const heroLeft = () => store.getState().hero.left

createControls(action => {
  switch (action.type) {
    case 'FIRE':
      store.dispatch(Object.assign({}, action, { left: heroLeft() }))
      break
    default:
      store.dispatch(action)
  }
})

createGameLoop(store.dispatch)

store.subscribe(() => {
  if (store.getState().dirty) {
    render()
    store.dispatch({type: 'DID_UPDATE'})
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
// probably it would be much easier to put all the sprites in a single array
// and then just pass them down to the view layer
