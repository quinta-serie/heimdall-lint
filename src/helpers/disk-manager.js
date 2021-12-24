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

/**
 * Returns the content of file
 * @param { string } path - The path to be listed
 * @returns { Array<string> }
 * @throws { Error }
 */
function loadFile(path) {
  if (!path || typeof path !== 'string') {
    throw new Error('The path must be a valid string')
  }

  try {
    const contentBuffer = readFileSync(path, {
      encoding: 'utf8'
    })
    const fileContent = String(contentBuffer)

    return fileContent.split(/\n/)
  } catch (_) {
    return []
  }
}

module.exports = {
  listDir,
  loadFile
}
