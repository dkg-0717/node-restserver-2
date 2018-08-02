const express = require('express')
const app = express()

// Rutas
app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./ping'));

module.exports = app;