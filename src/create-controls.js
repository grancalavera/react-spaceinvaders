import {
  moveHero
, fireHero
} from './actions'

export const createControls = (onChange = () => {}) => {

  const LEFT  = 37
      , RIGHT = 39
      , SPACE = 32

  const onKeydown = e => {
    switch (e.keyCode) {
      case LEFT:
        onChange(moveHero(-1))
        break
      case RIGHT:
        onChange(moveHero(1))
        break
      case SPACE:
        onChange(fireHero())
        break
    }
  }

  const onKeyup = e => {
    switch (e.keyCode) {
      case LEFT:
      case RIGHT:
        onChange(moveHero(0))
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
