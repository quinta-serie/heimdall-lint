const CliCommandHandler = require('./cli-command-handler')
const DefaultCommandHandler = require('./default-command-handler')

/* eslint-disable require-jsdoc */
class CommandHandler {
  constructor() {
    this._headHandler = this._setUp()
  }

  _setUp() {
    const cliCommandHandler = new CliCommandHandler()
    const defaultCommandHandler = new DefaultCommandHandler()

    cliCommandHandler
      .setNext(defaultCommandHandler)

    return cliCommandHandler
  }

  /**
   * @param { import('commander').Command } command - Instance of Command
   */
  run(command, argv) {
    this._headHandler.setUp(command)

    command.parse(argv)

    this._headHandler.handle(command)
  }
}

module.exports = CommandHandler
