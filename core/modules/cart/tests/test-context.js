// this file will be includded automatically from module registration, for now I'ma dding it manually to karma.conf.js
var context = require.context('./', true, /\.spec\.js$/)
context.keys().forEach(context)
