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
    errors: []
  }

  let lineNumber = 1

  for(let line of fileContent) {
    for(let detail of rules) {
      if (detail.ext && !detail.ext.includes(fileDetail.extension)) continue

      const rule = detail.rules.find(re => re.test(line))

      if (rule) {
        result.errors.push({
          lineNumber,
          lineContent: line,
          description: detail.description,
          id: detail.id,
          rule
        })
      }
    }

    lineNumber += 1
  }

  result.hasError = Boolean(result.errors.length)

  return result
}

/**
 * Print the errors on screen
 * @param { RuleError } error - The errors found by checkRules
 */
function printErrors(error) {
  if (!error.hasError) return

  console.log('## path:', error.path)
  console.log(error.errors)
}

module.exports = {
  checkRules,
  printErrors
}
