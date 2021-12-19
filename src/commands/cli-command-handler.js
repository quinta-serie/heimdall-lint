/* eslint-disable require-jsdoc */
const AbstractHandler = require('../helpers/abstract-handler')

class CliCommandHandler extends AbstractHandler {
  /**
   * @param { import('commander').Command } command - Instance of Command
   * @return { AbstractHandler }
   */
  setUp(command) {
    command
      .option('-d, --debug', 'output extra debugging')
      .option('-s, --small', 'small pizza size')
      .option('-p, --pizza-type <type>', 'flavour of pizza')

    return super.setUp(command)
  }

  /**
   * @param { import('commander').Command } command - Instance of Command
   * @return { AbstractHandler }
   */
  handle(command) {
    try {
      const options = command.opts()
      if (options.debug) console.log(options)
      if (options.small) console.log('- small pizza size')
      if (options.pizzaType) console.log(`- ${options.pizzaType}`)

      return super.handle(command)
    } catch (_) {
      return null
    }
  }
}

module.exports = CliCommandHandler
