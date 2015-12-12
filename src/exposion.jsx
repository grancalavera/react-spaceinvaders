import React from 'react'

const Explosion = props => {
  let style = { top: props.top, left: props.left }
  return <div className="sprite explosion" style={ style }></div>
}

Explosion.defaultProps = {
  top: 0
, left: 0
}

Explosion.propTypes = {
  top: React.PropTypes.number
, left: React.PropTypes.number
}

export default Explosion
