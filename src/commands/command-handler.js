const CliCommandHandler = require('./cli-command-handler')

/* eslint-disable require-jsdoc */
class CommandHandler {
  constructor() {
    this._headHandler = this._setUp()
  }

  _setUp() {
    return new CliCommandHandler()
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
