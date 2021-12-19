class AbstractHandler {
  // eslint-disable-next-line require-jsdoc
  constructor() {
    this.nextHandler = null
  }

  /**
   * Set the next handler
   * @param { AbstractHandler } handler - The next handler to be executed
   * @return { AbstractHandler }
   */
  setNext(handler) {
    this.nextHandler = handler

    return handler
  }

  /**
   * @param { * } data - The data object
   * @return { AbstractHandler }
   */
  handle(data) {
    if (this.nextHandler) {
      return this.nextHandler.handle(data)
    }

    return null
  }
}

module.exports = AbstractHandler
