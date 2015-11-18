var mongoose = require('mongoose');

var UsuarioAceptacionSchema = new mongoose.Schema({
  id_usuario: {type: String, required: true},
  id_quejas_aceptadas: [{
    type: String
  }]
}, {collection: 'usuariosaceptaciones'});

module.exports = mongoose.model('UsuarioAceptacion', UsuarioAceptacionSchema);
