// =============================
// Puerto
// =============================

process.env.PORT = process.env.PORT || 3000;


// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://cafe-user:Dark0117@ds229701.mlab.com:29701/cafe-dkg'
}

process.env.urlDB = urlDB;