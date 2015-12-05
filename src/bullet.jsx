import React from 'react'

export default function Bullet(props) {
  let style = { top: props.top, left: props.left }
  return <div style={ style }></div>
}

Bullet.defaultProps =
  {
    top: 0
  , left: 0
  }
