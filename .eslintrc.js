module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
    mocha: true,
  },
  globals: {
    chrome: 'readonly',
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    complexity: ['error', 10],
    'no-unexpected-multiline': 'error',
    'func-names': ['error', 'never'],
    'spaced-comment': ['off'],
    'no-underscore-dangle': ['off'],
    'no-unused-vars': ['error'],
    'no-unused-expressions': ['error'],
    'linebreak-style': 0,
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-extra-boolean-cast': ['off'],
    'no-param-reassign': ['off'],
    'no-use-before-define': 'off',
    'semi-style': ['error'],
    indent: ['error', 2],
    'no-trailing-spaces': ['error'],
    'no-multi-spaces': 'error',
    'no-undef': ['error', { typeof: true }],
    'space-before-function-paren': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    'require-jsdoc': ['error', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: false,
        ArrowFunctionExpression: false,
        FunctionExpression: true
      }
    }],
    'space-infix-ops': 'error',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
  },
}
