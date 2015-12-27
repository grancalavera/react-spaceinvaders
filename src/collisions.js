import {destroyEnemy} from './actions'

export const collisions = store => {
  let bullet = store.getState().heroBullets[0]
  if (!bullet) return
  store.getState().enemiesGrid.enemies.forEach(enemy => {
    let v = enemy.top < bullet.top && bullet.top < enemy.top + enemy.height
      , h = enemy.left < bullet.left && bullet.left < enemy.left + enemy.width
    if (v && h)  store.dispatch(destroyEnemy(enemy))
  })
}

