const colors = require('colors/safe')

/**
 * Check the rules in fileContent
 * @param { FileDetail } fileDetail - The path of file
 * @param { Array<string> } fileContent - The file content
 * @param { Array<Rule> } rules - The rules from heimdallrc
 * @returns { RuleError }
 */
function checkRules(fileDetail, fileContent, rules) {
  const result = {
    path: fileDetail.fullPath,
    hasError: false,
    errors: {}
  }

  let lineNumber = 1

  for(let lineContent of fileContent) {
    for(let detail of rules) {
      if (detail.ext && !detail.ext.includes(fileDetail.extension)) continue

      const rule = getMatchedRule(detail.rules, lineContent)

      if (rule) {
        if (!result.errors[detail.id]) {
          result.errors[detail.id] = {
            id: detail.id,
            description: detail.description,
            discoveries: []
          }

          result.hasError = true
        }

        result.errors[detail.id].discoveries.push({
          lineContent,
          lineNumber,
          rule
        })
      }
    }

    lineNumber += 1
  }

  return result
}

/**
 * Print the errors on screen
 * @param { RuleError } error - The errors found by checkRules
 */
function printErrors(error) {
  if (!error.hasError) return

  console.log(colors.grey(`## ${error.path}`))

  Object.values(error.errors).forEach(err => {
    console.log(colors.red(`${err.id} - ${err.description}`))

    err.discoveries.forEach(detail => {
      console.log(`${colors.yellow(detail.lineNumber)} ${addHighlights(detail.rule, detail.lineContent)}`)
    })

    console.log('')
  })

  if (error.hasError) process.exit(1)
}

/**
 * Add highlights on text using the RegEx
 * @param { RegExp } regex - The pattern used to detect the highlight
 * @param { string } text - The target text
 * @returns { string }
 */
function addHighlights(regex, text) {
  const withHighlight = text.replace(regex, input => colors.bgRed(input))

  return colors.white(withHighlight)
}

/**
 * Check with the line does match with some rule and returns this rule
 * @param { Array<RegExp> } rules - The array of rules
 * @param { string } lineContent - The content of line
 * @returns { RegExp | null }
 */
function getMatchedRule(rules, lineContent) {
  for (let rule of rules) {
    const regex = new RegExp(rule)

    if (regex.test(lineContent)) return regex
  }

  return null
}

module.exports = {
  checkRules,
  printErrors
}
