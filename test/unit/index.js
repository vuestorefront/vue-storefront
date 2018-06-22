
//  Core API modules tests
var coreApiTest = require.context('../../core/api', true, /\.spec$/)
// testsContext.keys().forEach(testsContext)
coreApiTest.keys().forEach(coreApiTest)
