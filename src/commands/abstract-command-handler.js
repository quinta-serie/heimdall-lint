/* eslint-disable require-jsdoc */
const AbstractHandler = require('../helpers/abstract-handler')

class AbstractCommandHandler extends AbstractHandler {
  /**
   * @param { * } data - The data object
   * @return { AbstractHandler }
   */
  setUp(data) {
    if (this.nextHandler) {
      return this.nextHandler.setUp(data)
    }

    return null
  }
}

module.exports = AbstractCommandHandler
