import React from 'react'
import ReactDom from 'react-dom'
import {createStore, combineReducers} from 'redux'
import hero from './hero-reducer'
import {
  enemies
, enemyExplosions
} from './enemies-reducer'
import heroBullets from './hero-bullets-reducer'
import {world} from './world-reducer'
import createControls from './create-controls'
import {createGameLoop} from './create-game-loop'
import {Stage} from './stage.jsx'
import {
  didUpdateWorld
, destroyEnemy
, FIRE_HERO
} from './actions'

const spaceInvaders = combineReducers({
  enemies
, enemyExplosions
, hero
, heroBullets
, world
})

const store = createStore(spaceInvaders)
    , heroLeft = () => store.getState().hero.left
    , heroBullet = () => store.getState().heroBullets[0]
    , enemyList = () => store.getState().enemies
    , render = () => ReactDom.render(<Stage world={store.getState()} />, document.getElementById('stage'))

const checkCollisions = () => {
  let bullet = heroBullet()
  if (!bullet) return

  enemyList().forEach( enemy => {
    let v = enemy.top < bullet.top && bullet.top < enemy.top + enemy.height
      , h = enemy.left < bullet.left && bullet.left < enemy.left + enemy.width
    if (v && h)  store.dispatch(destroyEnemy(enemy))
  })
}

createControls(action => {
  switch (action.type) {
    case FIRE_HERO:
      store.dispatch(Object.assign({}, action, {left: heroLeft()}))
      break
    default:
      store.dispatch(action)
  }
})

createGameLoop(store.dispatch)

store.subscribe(() => {
  if (store.getState().world.outdated) {
    render()
    store.dispatch(didUpdateWorld())
 }
  checkCollisions()
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
// https://github.com/matthew-andrews/isomorphic-fetch
// http://redux.js.org/docs/advanced/ExampleRedditAPI.html
// move all actions to a separate file
// instead of dirty:
// stale
// expired
// old
// world changed
// .. :(
// remember ({foo, bar, ...props})
// replace all usages of actions by action functions first
// move game loop into a middleware
/*
  x x x x x x x x x x x
  x x x x x x x x x x x
  x x x x x x x x x x x
  x x x x x x x x x x x
  x x x x x x x x x x x
  x x x x x x x x x x x
  x x x x x x x x x x x
  x x x x x x x x x x x
  x x x x x x x x x x x
*/
// test ui using shallow rendering
// https://facebook.github.io/react/docs/test-utils.html
// css in js npm install radium
// http://projects.formidablelabs.com/radium/
// sufficiently local css is indistinguishable from inline styles
// jed schmidt brooklynjs
// https://www.youtube.com/watch?v=XjK03if9o7s
// http://tachyons.io
// http://jxnblk.com/gravitons
// https://github.com/chantastic/minions.css/tree/master
