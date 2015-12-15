import {
  moveHero
, fireHero
} from './actions'

export const controls = (store) => {

  const LEFT  = 37
      , RIGHT = 39
      , SPACE = 32
      , hero = () => store.getState().hero[0]

  const onKeydown = e => {
    switch (e.keyCode) {
      case LEFT:
        store.dispatch(moveHero(-1))
        break
      case RIGHT:
        store.dispatch(moveHero(1))
        break
      case SPACE:
        store.dispatch(fireHero(hero().left))
        break
    }
  }

  const onKeyup = e => {
    switch (e.keyCode) {
      case LEFT:
      case RIGHT:
        store.dispatch(moveHero(0))
        break
    }
  }

  window.addEventListener('keydown', onKeydown)
  window.addEventListener('keyup',onKeyup)
}
