const bodyParser = require('body-parser');
const app = require('express')();

app.use(bodyParser.json());
module.exports = app;
