import React from 'react'

const Enemy = props => {
  let style = { top: props.top, left: props.left }
  return <div className={ className(props) } style={ style }></div>
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
const type = value => (['one', 'two', 'three'][value])
const className = props => {
  if (props.alive) return `sprite enemy ${ type(props.type) } ${ flip(props.flip) }`
  return 'sprite explosion'
}

export default Enemy
