const { readdirSync, readFileSync } = require('fs')

/**
 * List all files and directories
 * @param { string } path - The path to be listed
 * @returns { Array<Dirent> }
 * @throws { Error }
 */
function listDir(path) {
  if (!path || typeof path !== 'string') {
    throw new Error('The path must be a valid string')
  }

  try {
    return readdirSync(path, {
      withFileTypes: true
    })
  } catch (_) {
    return []
  }
}

module.exports = {
  listDir
}
