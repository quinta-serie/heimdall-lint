/* eslint-disable require-jsdoc */
const AbstractHandler = require('../helpers/abstract-handler')

class DefaultCommandHandler extends AbstractHandler {
  /**
   * @param { import('commander').Command } command - Instance of Command
   * @return { AbstractHandler }
   */
  setUp(command) {
    command
      .option('-t, --test', 'test command')
      .option('-o, --other', 'other command')

    return super.setUp(command)
  }

  /**
   * @param { import('commander').Command } command - Instance of Command
   * @return { AbstractHandler }
   */
  handle(command) {
    try {
      const options = command.opts()

      if (options.test) console.log('- jubileu')
      if (options.other) console.log('- other command')

      return super.handle(command)
    } catch (_) {
      return null
    }
  }
}

module.exports = DefaultCommandHandler
