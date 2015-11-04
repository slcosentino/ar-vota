var mongoose = require('mongoose');

var Encuesta = require('../models/EncuestaSchema');

var UsuarioAccionSchema = new mongoose.Schema({
  id_usuario: {type: String, required: true},
  id_encuestas_vistas: [{
    type: String
  }],
  id_encuestas_completadas: [{
    type: String
  }]
}, {collection: 'usuarioacciones'});

module.exports = mongoose.model('UsuarioAccion', UsuarioAccionSchema);
