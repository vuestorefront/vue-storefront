const tasks = arr => arr.join(' && ')

module.exports = {
  'hooks': {
    'pre-commit': tasks([
      'lint-staged'
    ])
    // We don't have valid tests yet
    // And it's slow as f$*! ...
    // 'pre-push': tasks([
    //   'yarn test:unit'
    // ])
  }
}
