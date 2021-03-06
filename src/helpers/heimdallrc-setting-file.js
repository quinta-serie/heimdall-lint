const path = require('path')
const Ajv = require('ajv')
const SchemaValidator = require('./schema-validator')
const { fileExists, loadFile } = require('./disk-manager')
const heimdallSchema = require('../schemes/heimdallrc-schema.json')

// eslint-disable-next-line require-jsdoc
function jsonParse(fileContent, fallbackValue = {}) {
  try {
    return JSON.parse(fileContent)
  } catch(_) {
    return fallbackValue
  }
}

/**
 * Check if the content of heimdallrc.json is valid
 * @param { Object } fileContent - The content of heimdallrc.json as an Object
 * @returns { boolean | Array }
 */
function isValid(fileContent) {
  const validator = new SchemaValidator(new Ajv({ allErrors: true }))
  const result = validator.validate(fileContent || {}, getHeimdallrcSchema())

  return result ? true : validator.getErrors()
}

/**
 * check if the heimdallrc.json file exists at the base dir
 * @param { string } currentPath - The current path of execution
 * @returns { boolean }
 */
function exists(currentPath) {
  const fullPath = path.join(currentPath, 'heimdallrc.json')

  return fileExists(fullPath)
}

/**
 * Load the content of heimdallrc.json and return it as an Object
 * @param { string } currentPath - The current path of execution
 * @returns { Heimdallrc }
 */
function getHeimdallrcContent(currentPath) {
  const fullPath = path.join(currentPath, 'heimdallrc.json')
  const content = jsonParse(loadFile(fullPath).join(''))

  if (content.exclude) {
    content.exclude = content.exclude.map(r => new RegExp(r))
  }

  if (content['ignore-content']) {
    content['ignore-content'] = content['ignore-content'].map(r => new RegExp(r, 'g'))
  }

  return content.rules ? content : undefined
}

/**
 * Returns the heimdallrc Schema content
 * @returns { Object }
 */
function getHeimdallrcSchema() {
  return heimdallSchema
}

module.exports = {
  exists,
  isValid,
  getHeimdallrcContent
}
