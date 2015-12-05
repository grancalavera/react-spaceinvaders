const createControls = (onMoveChange = () => {}, onFire = () => {}) => {

  const LEFT  = 37
      , RIGHT = 39
      , SPACE = 32

  const onKeydown = e => {
    switch (e.keyCode) {
      case LEFT:
        onMoveChange({type: 'MOVE', direction: 'LEFT'})
        break
      case RIGHT:
        onMoveChange({type: 'MOVE', direction: 'RIGHT'})
        break
      case SPACE:
        onFire({type: 'FIRE'})
        break
    }
  }

  const onKeyup = e => {
    switch (e.keyCode) {
      case LEFT:
      case RIGHT:
        onMoveChange({type: 'MOVE', direction: 'STOP'})
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
