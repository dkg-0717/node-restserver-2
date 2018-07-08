require('./config/config');

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(require('./rutas/usuario'));

mongoose.connect(process.env.urlDB, (err) => {
    if (err) throw err;
    console.log('Base de datos conectada');
});

app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto', process.env.PORT);
});