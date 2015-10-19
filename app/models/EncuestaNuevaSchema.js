var mongoose = require('mongoose');

var EncuestaNuevaSchema = new mongoose.Schema({
  id_encuesta: {type: String, required: true},
  topico: {type: String, required: true},
  titulo: {type: String, required: true}
}, {collection: 'encuestasnuevas'});

module.exports = mongoose.model('EncuestaNueva', EncuestaNuevaSchema);
