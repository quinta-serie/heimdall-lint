const colors = require('colors/safe')
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
   * @param { Array<string> } argv - Array with arguments from process.argv
   */
  run(command, argv) {
    try {
      this._headHandler.setUp(command)

      command.parse(argv)

      this._headHandler.handle(command)
    } catch (ex) {
      console.log(colors.red(ex.message))
    }
  }
}

module.exports = CommandHandler
