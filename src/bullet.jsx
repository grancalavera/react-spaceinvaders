import React from 'react'

export const Bullet = props => {
  let {top, left} = props
  return <div className="sprite bullet" style={{top, left}}></div>
}

Bullet.defaultProps = {
  top: 0
, left: 0
}
