const loop = (lastTime) => {
  let currentTime = now()
  update(currentTime - lastTime)
  requestAnimationFrame(() => loop(currentTime))
}

const now = () => Date.now()
