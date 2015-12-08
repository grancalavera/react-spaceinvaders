import { updateWorld } from './actions'

export const createGameLoop = (onUpdate = () => {}) => {
  let stop = false

  const loop = (lastTime) => {
    let currentTime = now()
    onUpdate(updateWorld(currentTime - lastTime))
    if (stop) return
    requestAnimationFrame(() => loop(currentTime))
  }

  const now = () => Date.now()
  const destroy = () => { stop  = true }

  loop(now())

  return destroy
}

