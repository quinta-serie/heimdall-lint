const { assert } = require('chai')
const AbstractCommandHandler = require('./abstract-command-handler')

describe('commands - abstract-command-handler', () => {
  /**
   * @type { AbstractCommandHandler }
   */
  let handler

  beforeEach(() => {
    handler = new AbstractCommandHandler()
  })

  it('should be return null when there is no next handler', () => {
    assert.strictEqual(handler.setUp(), null)
    assert.strictEqual(handler.setUp({}), null)
    assert.strictEqual(handler.setUp([]), null)
  })

  it('should return the value processed according next handler', () => {
    const mock = {
      setUp: (value) => `the type of is: ${typeof value}`
    }

    handler.setNext(mock)

    assert.strictEqual(handler.setUp(), 'the type of is: undefined')
    assert.strictEqual(handler.setUp({}), 'the type of is: object')
    assert.strictEqual(handler.setUp(1), 'the type of is: number')
    assert.strictEqual(handler.setUp(1.5), 'the type of is: number')
    assert.strictEqual(handler.setUp('test'), 'the type of is: string')
    assert.strictEqual(handler.setUp(null), 'the type of is: object')
    assert.strictEqual(handler.setUp(true), 'the type of is: boolean')
    assert.strictEqual(handler.setUp(() => {}), 'the type of is: function')
  })
})
