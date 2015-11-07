var mongoose = require('mongoose');

var UsuarioSeguidorSchema = new mongoose.Schema({
  id_usuario: {type: String, required: true},
  id_seguidores: [{
    type: String
  }]
}, {collection: 'usuarioseguidores'});

module.exports = mongoose.model('UsuarioSeguidor', UsuarioSeguidorSchema);
