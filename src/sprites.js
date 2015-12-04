'use strict';

const React = require('react')
    , ReactDom = require('react-dom')

const Hero = (props) => {
  let style = { top: props.top, left: props.left }
  return <div className="sprite hero" style={ style }></div>
}

const Enemy = (props) => {
  let className = `sprite enemy ${enemyType(props.type)} ${flipEnemy(props.flip)}`
    , style = { top: props.top, left: props.left }
  return <div className={ className } style={ style }></div>
}

const flipEnemy = (value) => {
  return value ? 'flip' : ''
}

const enemyType = (value) => {
  let types = ['one', 'two', 'three']
  return types[value]
}

Enemy.defaultProps = {
  type: 'one'
, flip: false
, top: 0
, left: 0
}

Enemy.propTypes = {
  flip: React.PropTypes.bool
, type: React.PropTypes.number
, top: React.PropTypes.number
, left: React.PropTypes.number
}

Hero.defaultProps = {
  top: 0
, left: 0
}

Hero.propTypes = {
  top: React.PropTypes.number
, left: React.PropTypes.number
}

module.exports.Enemy = Enemy
module.exports.Hero = Hero
