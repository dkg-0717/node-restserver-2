const express = require('express');
const app = express();

app.get('/ping', function(req, res) {
    res.json(200, { status: 'ok' });
});

module.exports = app;