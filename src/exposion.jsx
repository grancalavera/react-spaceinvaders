import React from 'react'

export const Explosion = props => {
  let {top, left} = props
  return <div className="sprite explosion" style={{top, left}}></div>
}

Explosion.defaultProps = {
  top: 0
, left: 0
}

Explosion.propTypes = {
  top: React.PropTypes.number
, left: React.PropTypes.number
}
