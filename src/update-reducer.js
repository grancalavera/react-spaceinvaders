const dirty = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE':
      return true
    case 'DID_UPDATE':
      return false
    default:
      return state
  }
}

export default dirty
