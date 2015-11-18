var mongoose = require('mongoose');

var SolicitudVerificacionSchema = new mongoose.Schema({
  id_usuario: {type: String, required: true},
  telefono: {type: String, required: true},
  social: {type: String, required: true}
}, {collection: 'solicitudesverificacion'});

module.exports = mongoose.model('SolicitudVerificacion', SolicitudVerificacionSchema);
