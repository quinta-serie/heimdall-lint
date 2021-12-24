const { assert } = require('chai')
const AbstractHandler = require('./abstract-handler')

describe('helpers - abstract-handler', () => {
  /**
   * @type { AbstractHandler }
   */
  let handler

  beforeEach(() => {
    handler = new AbstractHandler()
  })

  it('should be return null when there is no next handler', () => {
    assert.strictEqual(handler.handle(), null)
    assert.strictEqual(handler.handle({}), null)
    assert.strictEqual(handler.handle([]), null)
  })

  it('should return the value processed according next handler', () => {
    const mock = {
      handle: (value) => `the type of is: ${typeof value}`
    }

    handler.setNext(mock)

    assert.strictEqual(handler.handle(), 'the type of is: undefined')
    assert.strictEqual(handler.handle({}), 'the type of is: object')
    assert.strictEqual(handler.handle(1), 'the type of is: number')
    assert.strictEqual(handler.handle(1.5), 'the type of is: number')
    assert.strictEqual(handler.handle('test'), 'the type of is: string')
    assert.strictEqual(handler.handle(null), 'the type of is: object')
    assert.strictEqual(handler.handle(true), 'the type of is: boolean')
    assert.strictEqual(handler.handle(() => {}), 'the type of is: function')
  })
})
