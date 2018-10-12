var context = require.context('../../core/modules/cart/tests/', true, /\.spec\.js$/)
context.keys().forEach(context)

context = require.context('../../core/modules/review/tests/', true, /\.spec\.js$/)
context.keys().forEach(context)
// rest will be added when moved to modules and refactored
