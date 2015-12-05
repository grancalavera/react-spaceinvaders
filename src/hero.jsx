import React from 'react'

const Hero = props => {
  let style = { top: props.top, left: props.left }
  return <div className="sprite hero" style={ style }></div>
}

Hero.defaultProps = {
  top: 0
, left: 0
}

Hero.propTypes = {
  top: React.PropTypes.number
, left: React.PropTypes.number
}

export default Hero
