/* eslint-disable require-jsdoc */
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

    if (!exists(path)) {
      throw new Error('The file heimdallrc.json is missing')
    }

    const hasErrors = isValid(getHeimdallrcContent(path))

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

    if (path) {
      console.log(options)
      console.log(path)
    }
  }
}

module.exports = CliCommandHandler
