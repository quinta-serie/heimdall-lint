const { assert } = require('chai')
const { listDir, loadFile, fileExists } = require('./disk-manager')

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

  describe('#loadFile', () => {
    const arrFileContent = [
      'MIT License',
      '',
      'Copyright (c) 2021 Quinta Série',
      '',
      'Permission is hereby granted, free of charge, to any person obtaining a copy',
      'of this software and associated documentation files (the "Software"), to deal',
      'in the Software without restriction, including without limitation the rights',
      'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell',
      'copies of the Software, and to permit persons to whom the Software is',
      'furnished to do so, subject to the following conditions:',
      '',
      'The above copyright notice and this permission notice shall be included in all',
      'copies or substantial portions of the Software.',
      '',
      'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR',
      'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,',
      'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE',
      'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER',
      'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,',
      'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE',
      'SOFTWARE.',
      ''
    ]

    it('should throws an Error when the path is not a string or is an empty string', () => {
      assert.throws(() => loadFile(), Error, 'The path must be a valid string')
      assert.throws(() => loadFile(''), Error, 'The path must be a valid string')
      assert.throws(() => loadFile(undefined), Error, 'The path must be a valid string')
      assert.throws(() => loadFile(null), Error, 'The path must be a valid string')
      assert.throws(() => loadFile(true), Error, 'The path must be a valid string')
      assert.throws(() => loadFile(false), Error, 'The path must be a valid string')
      assert.throws(() => loadFile(1), Error, 'The path must be a valid string')
      assert.throws(() => loadFile(0), Error, 'The path must be a valid string')
      assert.throws(() => loadFile([]), Error, 'The path must be a valid string')
      assert.throws(() => loadFile({}), Error, 'The path must be a valid string')
    })

    it('should returns an empty arry when the path does not exists', () => {
      assert.deepStrictEqual(loadFile('./not-exists'), [])
    })

    it('should returns the content of file as array of string when passed a valid path', () => {
      assert.deepStrictEqual(loadFile('./LICENSE'), arrFileContent)
    })

    it('should returns an empty array when the path is a directory instead a file', () => {
      assert.deepStrictEqual(loadFile('./src'), [])
    })
  })

  describe('#fileExists', () => {
    it('should returns true when the path passed by parameter exists', () => {
      assert.strictEqual(fileExists('./LICENSE'), true)
    })

    it('should returns false when the path passed by parameter does not exists', () => {
      assert.strictEqual(fileExists('./not-exists'), false)
    })

    it('should returns false when the path passed by parameter is not a valid string', () => {
      assert.strictEqual(fileExists(''), false)
      assert.strictEqual(fileExists(), false)
      assert.strictEqual(fileExists(1), false)
      assert.strictEqual(fileExists(0), false)
      assert.strictEqual(fileExists(true), false)
      assert.strictEqual(fileExists(false), false)
      assert.strictEqual(fileExists(undefined), false)
      assert.strictEqual(fileExists([]), false)
      assert.strictEqual(fileExists({}), false)
      assert.strictEqual(fileExists(null), false)
    })
  })
})
