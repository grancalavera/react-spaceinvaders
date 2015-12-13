import React from 'react'

export const Hero = props => {
  let {top, left} = props
  return <div className="sprite hero" style={{top, left}}></div>
}

Hero.defaultProps = {
  top: 0
, left: 0
}

Hero.propTypes = {
  top: React.PropTypes.number
, left: React.PropTypes.number
}
