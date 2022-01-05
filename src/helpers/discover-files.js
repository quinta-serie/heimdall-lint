const { join } = require('path')
const { checkRules, printErrors } = require('./check-rules')
const { listDir, loadFile } = require('./disk-manager')

/**
 * Explorer the files in current path
 * @param { string } path - Tha base dir path
 * @param { Heimdallrc } heimdallrc - The heimdallrc content
 * @param { import('commander').OptionValues } options - The command options
 */
function discoverAndPrintErrors(path, heimdallrc, options) {
  const list = listDir(path)

  for (let item of list) {
    const isIgnored = heimdallrc.exclude.some(r => r.test(item.name))

    if (isIgnored) continue

    const fullPath = join(path, item.name)

    if (item.isDirectory()) {
      // find new files into directory
      discoverAndPrintErrors(fullPath, heimdallrc, options)
    } else {
      const extension = item.name.split('.').pop()
      const isAllowedExtension = heimdallrc.ext.includes(extension)

      if (isAllowedExtension) {
        const fileContent = loadFile(fullPath)
        const errors = checkRules({ fullPath, extension }, fileContent, heimdallrc)

        printErrors(errors)
      }
    }
  }
}

module.exports = {
  discoverAndPrintErrors
}
