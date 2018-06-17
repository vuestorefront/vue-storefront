// require all test files (files that ends with .spec.js)
// old tests
// var testsContext = require.context('./specs', true, /\.spec$/)
// new core API modules tests
var coreApiTest = require.context('../../core/api', true, /\.spec$/)
// testsContext.keys().forEach(testsContext)
coreApiTest.keys().forEach(coreApiTest)
