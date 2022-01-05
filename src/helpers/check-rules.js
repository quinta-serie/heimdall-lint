const colors = require('colors/safe')

/**
 * Check the rules in fileContent
 * @param { FileDetail } fileDetail - The path of file
 * @param { Array<string> } fileContent - The file content
 * @param { Heimdallrc } heimdallrc - The rules from heimdallrc
 * @returns { RuleError }
 */
function checkRules(fileDetail, fileContent, heimdallrc) {
  const result = {
    path: fileDetail.fullPath,
    hasError: false,
    errors: {}
  }

  let lineNumber = 1

  for(let lineContent of fileContent) {
    for(let rule of heimdallrc.rules) {
      if (rule.ext && !rule.ext.includes(fileDetail.extension)) continue

      const content = blinderContent(lineContent, heimdallrc['ignore-content'])
      const matchedRule = getMatchedRule(rule.rules, content)

      if (matchedRule) {
        if (!result.errors[rule.id]) {
          result.errors[rule.id] = {
            id: rule.id,
            description: rule.description,
            discoveries: []
          }

          result.hasError = true
        }

        result.errors[rule.id].discoveries.push({
          lineContent,
          lineNumber,
          rule: matchedRule
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
      const lineContent = `${colors.yellow(detail.lineNumber)} ${addHighlights(detail.rule, detail.lineContent)}`

      console.log(lineContent.replace(/\n/, ''))
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
 * @param { Array<string> } rules - The array of rules
 * @param { string } lineContent - The content of line
 * @returns { RegExp | undefined }
 */
function getMatchedRule(rules, lineContent) {
  for (let rule of rules) {
    const regex = new RegExp(rule, 'g')

    if (regex.test(lineContent)) return regex
  }
}

/**
 * Replace all contents to be ignored
 * @param { string } lineContent - The content of line
 * @param { Array<RegExp> } ignoreContent - Array of replacers content
 * @returns { string }
 */
function blinderContent(lineContent, ignoreContent) {
  const blinder = Date.now()

  return (ignoreContent || [])
    .reduce((line, replacer) => {
      return line.replace(replacer, `"${blinder}"`)
    }, lineContent)
}

module.exports = {
  checkRules,
  printErrors
}
