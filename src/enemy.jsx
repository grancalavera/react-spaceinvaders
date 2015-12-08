import React from 'react'

const Enemy = props => {
  let className = `sprite enemy ${ type(props.type) } ${ flip(props.flip) }`
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

const flip = value => (value ? 'flip' : '')
const type = value => (['one', 'two', 'three'][value])

export default Enemy
