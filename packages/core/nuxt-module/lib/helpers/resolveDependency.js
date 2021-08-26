module.exports = function resolveDependency (name) {
  try {
    return require.resolve(name, { paths: [ process.cwd() ] })
  } catch (error) {
    return false;
  }
};
