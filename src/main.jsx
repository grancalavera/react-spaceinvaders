import React from 'react'
import ReactDom from 'react-dom'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {hero} from './hero-reducer'
import {enemies} from './enemies-reducer'
import {heroBullets} from './hero-bullets-reducer'
import {enemyExplosions} from './enemy-explosions-reducer'
import {controls} from './controls'
import {gameLoop} from './game-loop'
import {collisions} from './collisions'
import {update} from './actions'
import {Stage} from './stage.jsx'

const spaceInvaders = combineReducers({
  enemies
, enemyExplosions
, hero
, heroBullets
})

const store = createStore(spaceInvaders)

const render = () => ReactDom.render(
  <Stage state={store.getState()} />
, document.getElementById('stage')
)

gameLoop(elapsedTime => {
  store.dispatch(update(elapsedTime))
  render()
  collisions(store)
  // update beat
  // beat(elapsedTime)
})

controls(store)
render()
