const tasks = arr => arr.join(' && ')

module.exports = {
  'hooks': {
    'pre-commit': tasks([
      'lint-staged'
    ]),
    'pre-push': tasks([
      'yarn test:unit'
    ])
  }
}
