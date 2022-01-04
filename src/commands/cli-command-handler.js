/* eslint-disable require-jsdoc */
const { discoverAndPrintErrors } = require('../helpers/discover-files')
const { exists, isValid, getHeimdallrcContent } = require('../helpers/heimdallrc-setting-file')
const AbstractCommandHandler = require('./abstract-command-handler')

class CliCommandHandler extends AbstractCommandHandler {
  /**
   * @param { import('commander').Command } command - Instance of Command
   * @return { AbstractHandler }
   */
  setUp(command) {
    command
      .option('-p, --path <path>', 'change the path where the lint is fired')
      .option('-o, --olny <rules>', 'run the lint with only this rules')
      .option('-e, --except <rules>', 'run the lint without this rules')

    return super.setUp(command)
  }

  /**
   * @param { import('commander').Command } command - Instance of Command
   * @return { AbstractHandler }
   */
  handle(command) {
    const options = command.opts()
    const path = options.path || process.cwd()

    this._validatePath(path)

    const heimdallrcContent = getHeimdallrcContent(path)

    this._validateHeimdallrcContent(heimdallrcContent)

    discoverAndPrintErrors(path, heimdallrcContent, options)

    return super.handle(command)
  }

  _validatePath(path) {
    if (!exists(path)) {
      throw new Error(`There's no file heimdallrc.json at ${path}`)
    }
  }

  _validateHeimdallrcContent(heimdallrcContent) {
    const hasErrors = isValid(heimdallrcContent)

    if (Array.isArray(hasErrors)) {
      const errors = hasErrors.reduce((message, error) => {
        return `${message}
          instance: ${error.instancePath}
          message: ${error.message}
          path: ${error.schemaPath}
        `
      }, '')

      throw new Error(`The file heimdallrc.json does not match with JSON Schema:
      ${errors}
      `)
    }
  }
}

module.exports = CliCommandHandler
