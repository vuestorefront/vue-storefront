var context = require.context('./', true, /\.spec\.js$/)
context.keys().forEach(context)

var modulesContext = require.context('./../../core/modules/', true, /\.spec\.js$/)
context.keys().forEach(modulesContext)
