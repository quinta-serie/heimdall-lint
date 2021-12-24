const fs = require('fs')

/**
 * List all
 * @param { string } path - The path to be listed
 * @returns { Array<Dirent> }
 */
function listDir(path) {
  if (!path || typeof path !== 'string') {
    throw new Error('The path must be a valid string')
  }

  try {
    return fs.readdirSync(path, {
      withFileTypes: true
    })
  } catch (_) {
    return []
  }
}

module.exports = {
  listDir
}
