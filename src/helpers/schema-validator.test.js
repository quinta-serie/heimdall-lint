const { assert } = require('chai')
const Ajv = require('ajv')

const SchemaValidator = require('./schema-validator')

describe('helpers - schema-validator', () => {
  /**
   * @type { SchemaValidator }
   */
  let schemaValidator = {}

  beforeEach(() => {
    schemaValidator = new SchemaValidator({
      compile: (schema) => {
        return (input) => {
          return typeof schema === 'object' && typeof input === 'object'
        }
      }
    })
  })

  it('returns true when the entries are an Object', () => {
    assert.strictEqual(schemaValidator.validate({}, {}), true)
    assert.strictEqual(schemaValidator.validate([], []), true)
  })

  it('returns true when the entries are invalid', () => {
    assert.strictEqual(schemaValidator.validate({}, undefined), false)
    assert.strictEqual(schemaValidator.validate({}, false), false)
    assert.strictEqual(schemaValidator.validate({}, 123), false)
    assert.strictEqual(schemaValidator.validate(undefined, {}), false)
    assert.strictEqual(schemaValidator.validate(false, {}), false)
    assert.strictEqual(schemaValidator.validate(123, {}), false)
  })

  it('throws an Error when the validation engine is not informed', () => {
    assert.throws(() => new SchemaValidator(), Error, 'Validation engine not informed')
  })

  it('returns true when the input is validated according to the schema', () => {
    const validation = new SchemaValidator(new Ajv())

    const input = {
      test: true,
      OLX: 'awesome',
      num: 123,
      pattern: '21-10-1991'
    }

    const schema = {
      type: 'object',
      properties: {
        test: {
          type: 'boolean'
        },
        OLX: {
          type: 'string'
        },
        num: {
          type: 'integer'
        },
        pattern: {
          type: 'string',
          pattern: '^[0-9]{2}-[0-9]{2}-[0-9]{4}$'
        }
      }
    }

    assert.strictEqual(validation.validate(input, schema), true)
  })

  it('returns false when the input is invalidated according to the schema', () => {
    const validation = new SchemaValidator(new Ajv())

    const input = {
      test: 'wrong',
      OLX: 123,
      num: 'test',
      pattern: 'bla bla bla'
    }

    const schema = {
      type: 'object',
      properties: {
        test: {
          type: 'boolean'
        },
        OLX: {
          type: 'string'
        },
        num: {
          type: 'integer'
        },
        pattern: {
          type: 'string',
          pattern: '^[0-9]{2}-[0-9]{2}-[0-9]{4}$'
        }
      }
    }

    assert.strictEqual(validation.validate(input, schema), false)
  })

  it('returns the errors found in the schema', () => {
    const validation = new SchemaValidator(new Ajv({ allErrors: true }))

    const errors = [
      {
        instancePath: '/one',
        schemaPath: '#/properties/one/type',
        keyword: 'type',
        params: { type: 'string' },
        message: 'must be string'
      },
      {
        instancePath: '/two',
        schemaPath: '#/properties/two/type',
        keyword: 'type',
        params: { type: 'number' },
        message: 'must be number'
      }
    ]

    const schema = {
      type: 'object',
      properties: {
        one: {
          type: 'string'
        },
        two: {
          type: 'number'
        }
      }
    }

    const data = {
      one: 123, two: 'test'
    }

    validation.validate(data, schema)

    assert.deepStrictEqual(validation.getErrors(), errors)
  })
})
