import React from 'react'
import ReactDom from 'react-dom'
import Stage from './stage.jsx'

const world =
  {
    width     : 64
  , height    : 64
  , cols      : 11
  , rows      : 10
  , enemyRows : 6
  , enemyCols : 9
  }

ReactDom.render(<Stage world={ world } />, document.getElementById('stage'))
