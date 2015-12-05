const createControls = (onChange = () => {}) => {

  const LEFT  = 37
      , RIGHT = 39
      , SPACE = 32

  const onKeydown = e => {
    switch (e.keyCode) {
      case LEFT:
        onChange({type: 'MOVE', direction: -1})
        break
      case RIGHT:
        onChange({type: 'MOVE', direction: 1})
        break
      case SPACE:
        onChange({type: 'FIRE'})
        break
    }
  }

  const onKeyup = e => {
    switch (e.keyCode) {
      case LEFT:
      case RIGHT:
        onChange({type: 'MOVE', direction: 0})
        break
    }
  }

  window.addEventListener('keydown', onKeydown)
  window.addEventListener('keyup',onKeyup)

  const destroy = () => {
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('keyup', onKeyup)
  }

  return destroy
}

export default createControls
