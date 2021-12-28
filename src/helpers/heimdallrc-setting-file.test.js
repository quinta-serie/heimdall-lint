const { assert } = require('chai')
const hdlrc = require('./heimdallrc-setting-file')

describe('helpers - heimdallrc-setting-file', () => {
  describe('#exists', () => {
    it('should returns true when there is a heimdallrc file at the base dir', () => {
      assert.strictEqual(hdlrc.exists('./'), true)
    })

    it('should returns false when there is no heimdallrc file at the base dir', () => {
      assert.strictEqual(hdlrc.exists('./no-exists'), false)
    })
  })

  describe('#isValid', () => {
    // eslint-disable-next-line require-jsdoc
    function testErrors(result, expected) {
      assert.deepStrictEqual(result, expected)
    }

    it('should returns true when the heimdallrc does match with JSON schema', () => {
      const content = hdlrc.getHeimdallrcContent('./__mock/heimdallrc')
      assert.strictEqual(hdlrc.isValid(content), true)
    })

    context('when the content is empty', () => {
      const expected = [
        {
          instancePath: '',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'rules' },
          message: "must have required property 'rules'"
        },
        {
          instancePath: '',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'ext' },
          message: "must have required property 'ext'"
        }
      ]

      it('should returns an Array of errors', () => {
        testErrors(hdlrc.isValid(), expected)
        testErrors(hdlrc.isValid(''), expected)
      })
    })

    context('when the properties are not filled', () => {
      const content = '{"rules": [], "ext": []}'
      const expected = [
        {
          instancePath: '/rules',
          schemaPath: '#/properties/rules/minItems',
          keyword: 'minItems',
          params: { limit: 1 },
          message: 'must NOT have fewer than 1 items'
        },
        {
          instancePath: '/ext',
          schemaPath: '#/properties/ext/minItems',
          keyword: 'minItems',
          params: { limit: 1 },
          message: 'must NOT have fewer than 1 items'
        }
      ]

      it('should returns an Array of errors', () => {
        testErrors(hdlrc.isValid(content), expected)
      })
    })

    context('when the content is an invalid JSON String', () => {
      const content = '{test: undefined}'
      const expected = [
        {
          instancePath: '',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'rules' },
          message: "must have required property 'rules'"
        },
        {
          instancePath: '',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'ext' },
          message: "must have required property 'ext'"
        }
      ]

      it('should returns an Array of errors', () => {
        testErrors(hdlrc.isValid(content), expected)
      })
    })
  })
})
