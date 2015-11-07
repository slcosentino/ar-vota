var mongoose = require('mongoose');

var UsuarioNotificacionSchema = new mongoose.Schema({
  id_usuario: {type: String, required: true},
  notificacion_publicaciones: [{
    id_candidato: String,
    id_objeto: String,
    titulo: String
  }]
}, {collection: 'usuarionotificaciones'});

module.exports = mongoose.model('UsuarioNotificacion', UsuarioNotificacionSchema);
