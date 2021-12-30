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
 * @property { Array<RuleErrorDetail> } errors
 */
/**
 * @typedef RuleErrorDetail
 * @property { number } lineNumber
 * @property { string } lineContent
 * @property { string } id
 * @property { string } description
 * @property { RegExp } rule
 */
/**
 * @typedef FileDetail
 * @property { string } fullPath
 * @property { string } extension
 */
