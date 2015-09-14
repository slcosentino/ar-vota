var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Propuesta = require('../models/PropuestasSchema');

router.post('/propuesta', function(req, res, next) {
  var propuesta = new Propuesta();
  propuesta.id_usuario = req.body.id_usuario;
  propuesta.texto = req.body.texto;
  propuesta.imagen = req.body.imagen;
  propuesta.email = req.body.email;

  propuesta.save(function(err) {
    if (!err) {
      req.login(usuario, function(err) {
        if (!err) {
          res.json({message: 'Propuesta creada con exito'})
        }
      });
    } else {
      res.status(400).json({message: 'Verifique los campos'});
    }
  });
});

module.exports = router;
