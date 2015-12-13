import React from 'react'
import ReactDom from 'react-dom'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {hero, getHero} from './hero-reducer'
import {enemies, enemyExplosions} from './enemies-reducer'
import {heroBullets}from './hero-bullets-reducer'
import {world} from './world-reducer'
import {didUpdateWorld, destroyEnemy, FIRE_HERO} from './actions'
import {createControls} from './create-controls'
import {createGameLoop} from './create-game-loop'
import SpaceInvaders from './space-invaders'

const spaceInvaders = combineReducers({
  enemies
, enemyExplosions
, hero
, heroBullets
, world
})

const store = createStore(spaceInvaders)
    , heroLeft = () => getHero(store.getState().hero).left
    , heroBullet = () => store.getState().heroBullets[0]
    , enemyList = () => store.getState().enemies
    , render = () => ReactDom.render(
        <Provider store={store}>
          <SpaceInvaders />
        </Provider>
      , document.getElementById('stage')
      )

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
