import React from 'react'

export default function Enemy(props) {
  let className = `sprite enemy ${enemyType(props.type)} ${flipEnemy(props.flip)}`
    , style = { top: props.top, left: props.left }
  return <div className={ className } style={ style }></div>
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

function flipEnemy(value) {
  return value ? 'flip' : ''
}

function enemyType(value) {
  return ['one', 'two', 'three'][value]
}
