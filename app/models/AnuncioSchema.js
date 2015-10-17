var mongoose = require('mongoose');

var AnuncioSchema = new mongoose.Schema({
  id_encuesta: {type: String, required: true},
  topico: { type: String, required: true},
  titulo: { type: String, required: true}
});

module.exports = mongoose.model('Anuncio', AnuncioSchema);
