const createGameLoop = (onUpdate = () => {}) => {
  let stop = false

  const loop = (lastTime) => {
    let currentTime = now()
    onUpdate({type: 'UPDATE', elapsedTime: currentTime - lastTime})
    if (stop) return
    requestAnimationFrame(() => loop(currentTime))
  }

  const now = () => Date.now()
  const destroy = () => { stop  = true }

  loop(now())

  return destroy
}

export default createGameLoop
