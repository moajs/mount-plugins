// for test
var express = require('express')
var app = express()

var mount = require('./index');

// simple
// mount(app);

// with path
// mount(app, true);

mount(app, 'plugins', true);
// mount(app, 'plugins2', 'app/routes/', true);

// start server
app.listen(23018)

