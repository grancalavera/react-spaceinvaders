import React from 'react'
import classNames from 'classnames'

export const Enemy = props => {
  let {top, left} = props
  return <div className={className(props)} style={{top, left}}></div>
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

const flip = value => (value ? 'flip' : '')
const enemyType = value => (['one', 'two', 'three'][value])
const className = props => {
  let {type, flip, selected} =  props
  return classNames('sprite', 'enemy', enemyType(type), {flip, selected})
}
