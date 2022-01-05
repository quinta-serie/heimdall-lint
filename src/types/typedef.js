/**
 * @typedef Heimdallrc
 * @property { Array<string> } ext
 * @property { Array<RegExp> } `ignore-content`
 * @property { Array<RegExp> } exclude
 * @property { Array<Rule> } rules
 */

/**
 * @typedef Rule
 * @property { string } id
 * @property { string } description
 * @property { Array<string> } rules
 * @property { Array<string> } [ext]
 */

/**
 * @typedef RuleError
 * @property { string } path
 * @property { boolean } hasError
 * @property { RuleErrors } errors
 */

/**
 * @typedef { Object.<string, RuleErrorsDetail> } RuleErrors
 */

/**
 * @typedef RuleErrorsDetail
 * @property { string } id
 * @property { string } description
 * @property { Array<RuleErrorsDetailDiscoveries> } discoveries
 */

/**
 * @typedef RuleErrorsDetailDiscoveries
 * @property { number } lineNumber
 * @property { string } lineContent
 * @property { RegExp } rule
 */

/**
 * @typedef FileDetail
 * @property { string } fullPath
 * @property { string } extension
 */
