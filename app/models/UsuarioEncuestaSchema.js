var mongoose = require('mongoose');

var Encuesta = require('../models/EncuestaSchema');

var UsuarioEncuestaSchema = new mongoose.Schema({
  id_usuario: {type: String, required: true},
  topico: { type: String, required: true},
  titulo: { type: String, required: true},
  id_encuestas: [{
    type: String
  }],
  encuestas: [{
    type: Encuesta
  }],
});

module.exports = mongoose.model('UsuarioEncuesta', UsuarioEncuestaSchema);
