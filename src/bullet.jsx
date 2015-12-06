import React from 'react'


const Bullet = props => {
  let style = { top: props.top, left: props.left }
  return <div className="sprite bullet" style={ style }></div>
}

Bullet.defaultProps = {
  top: 0
, left: 0
}

export default Bullet
