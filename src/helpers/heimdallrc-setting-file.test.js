const { assert } = require('chai')
const { exists, getHeimdallrcContent, isValid } = require('./heimdallrc-setting-file')

describe('helpers - heimdallrc-setting-file', () => {
  describe('#exists', () => {
    it('should returns true when there is a heimdallrc file at the base dir', () => {
      assert.strictEqual(exists('./__mock/heimdallrc'), true)
    })

    it('should returns false when there is no heimdallrc file at the base dir', () => {
      assert.strictEqual(exists('./no-exists'), false)
    })
  })

  describe('#isValid', () => {
    // eslint-disable-next-line require-jsdoc
    function testErrors(result, expected) {
      assert.deepStrictEqual(result, expected)
    }

    it('should returns true when the heimdallrc does match with JSON schema', () => {
      const content = getHeimdallrcContent('./__mock/heimdallrc')
      assert.strictEqual(isValid(content), true)
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
        },
        {
          instancePath: '',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'exclude' },
          message: "must have required property 'exclude'"
        }
      ]

      it('should returns an Array of errors', () => {
        testErrors(isValid(), expected)
        testErrors(isValid(''), expected)
      })
    })

    context('when the properties are not filled', () => {
      const content = { rules: [], ext: [], exclude: [] }
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
        },
        {
          instancePath: '/exclude',
          schemaPath: '#/properties/exclude/minItems',
          keyword: 'minItems',
          params: { limit: 1 },
          message: 'must NOT have fewer than 1 items'
        }
      ]

      it('should returns an Array of errors', () => {
        testErrors(isValid(content), expected)
      })
    })

    context('when the content is an invalid JSON String', () => {
      const content = { test: undefined }
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
        },
        {
          instancePath: '',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'exclude' },
          message: "must have required property 'exclude'"
        }
      ]

      it('should returns an Array of errors', () => {
        testErrors(isValid(content), expected)
      })
    })
  })

  describe('#getHeimdallrcContent', () => {
    it('should returns undefined when the path does not exists', () => {
      assert.isUndefined(getHeimdallrcContent('./no-exists'))
    })

    it('should returns undefined when there is no heimdallrc.json file in the path informed', () => {
      assert.isUndefined(getHeimdallrcContent('./src'))
    })

    it('should returns the heimdallrc.json content as an Object', () => {
      const heimdallrc = getHeimdallrcContent('./__mock/heimdallrc')

      assert.isArray(heimdallrc.rules)
      assert.isArray(heimdallrc.ext)
      assert.isArray(heimdallrc.exclude)
      assert.isArray(heimdallrc.rules[0].rules)
      assert.instanceOf(heimdallrc.exclude[0], RegExp)
    })
  })
})
