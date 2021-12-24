const { assert } = require('chai')
const { listDir } = require('./disk-manager')

describe('helpers - disk-manager', () => {
  describe('#listDir', () => {
    it('should throws an Error when the path is not a string or is an empty string', () => {
      assert.throws(() => listDir(), Error, 'The path must be a valid string')
      assert.throws(() => listDir(''), Error, 'The path must be a valid string')
      assert.throws(() => listDir(undefined), Error, 'The path must be a valid string')
      assert.throws(() => listDir(null), Error, 'The path must be a valid string')
      assert.throws(() => listDir(true), Error, 'The path must be a valid string')
      assert.throws(() => listDir(false), Error, 'The path must be a valid string')
      assert.throws(() => listDir(1), Error, 'The path must be a valid string')
      assert.throws(() => listDir(0), Error, 'The path must be a valid string')
      assert.throws(() => listDir([]), Error, 'The path must be a valid string')
      assert.throws(() => listDir({}), Error, 'The path must be a valid string')
    })

    it('should returns an empty arry when the path does not exists', () => {
      assert.deepStrictEqual(listDir('./not-exists'), [])
    })

    it('should returns an array containing the list of files and directories for the path passed by parameter', () => {
      const list = listDir('./src').map(i => i.name)

      assert.include(list, 'index.js')
      assert.include(list, 'helpers')
      assert.include(list, 'commands')
    })
  })
})
