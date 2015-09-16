var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Propuesta = require('../models/PropuestasSchema');

router.post('/', function(req, res, next) {
  var propuesta = new Propuesta();
  propuesta.id_usuario = req.body.id_usuario;
  propuesta.descripcion = req.body.descripcion;
  // propuesta.imagen = req.body.imagen;

  propuesta.save(function(err) {
    if (!err) {
      res.json({message: 'Propuesta creada con exito'})
    } else {
      res.status(400).json({message: 'Verifique los campos'});
    }
  });
});

module.exports = router;
