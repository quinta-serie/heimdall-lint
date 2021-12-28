const path = require('path')
const Ajv = require('ajv')
const SchemaValidator = require('./schema-validator')
const { fileExists, loadFile } = require('./disk-manager')
const heimdallSchema = require('../schemes/heimdallrc-schema.json')

// eslint-disable-next-line require-jsdoc
function jsonParse(fileContent, fallbackValue = {}) {
  try {
    return fileContent ? JSON.parse(fileContent) : fallbackValue
  } catch(_) {
    return fallbackValue
  }
}

/**
 * Check if the content of heimdallrc.json is valid
 * @param { string } fileContent - The content of heimdallrc.json
 * @returns { boolean | Array }
 */
function isValid(fileContent) {
  const validator = new SchemaValidator(new Ajv({ allErrors: true }))
  const jsonContent = jsonParse(fileContent)

  if (validator.validate(jsonContent, getHeimdallrcSchema())) {
    return true
  }

  return validator.getErrors()
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
 * Load the content of heimdallrc.json and return it
 * @param { string } currentPath - The current path of execution
 * @returns { string }
 */
function getHeimdallrcContent(currentPath) {
  const fullPath = path.join(currentPath, 'heimdallrc.json')

  return loadFile(fullPath).join('\n')
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
