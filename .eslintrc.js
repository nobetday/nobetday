module.exports = {
  plugins: [
    'no-null',
    'simple-import-sort',
  ],
  rules: {
    'max-lines': ['error', { max: 200, skipBlankLines: true, skipComments: true }],
    'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
    'no-null/no-null': 'error',
    'import/order': 'off',
    'sort-imports': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/react-in-jsx-scope': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
  },
}
