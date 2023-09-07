const mapping = {
  "fake-module.js": "/fake-module.js",
};

function resolver(path, options) {
  // If the path corresponds to a key in the mapping object, returns the fakely resolved path
  // otherwise it calls the Jest's default resolver

  return mapping[path] || options.defaultResolver(path, options);
}

module.exports = resolver;
