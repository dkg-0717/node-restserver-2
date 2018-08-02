const express = require('express')
const app = express()
const Usuario = require('../models/usuario');
const { verificaToken, verificaRole } = require('../middlewares/autenticacion');
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get('/usuario', verificaToken, function(req, res) {

    // return res.json({
    //     usuario: req.usuario,
    //     nombre: req.usuario.nombre
    // })

    let desde = Number(req.query.desde || 0);
    let limite = Number(req.query.limite || 5);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    total: conteo,
                    usuarios
                })
            })

        })
});

app.post('/usuario',[verificaToken, verificaRole], (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.put('/usuario/:id',[verificaToken, verificaRole], function(req, res) {
    let validaciones = {
        new: true,
        runValidators: true
    }

    let opt = ['nombre', 'email', 'img', 'role', 'estado'];

    let id = req.params.id;
    let body = _.pick(req.body, opt);

    Usuario.findByIdAndUpdate(id, body, validaciones, (err, usuarioDB) => {

        console.log(usuarioDB);

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.delete('/usuario/:id',[verificaToken, verificaRole], function(req, res) {
    let id = req.params.id;
    let val = { new: true }
    let cambiaEstado = { estado: false }
    Usuario.findByIdAndUpdate(id, cambiaEstado, val, (err, usuarioB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioB) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuarioB
        });

    });
});

module.exports = app;