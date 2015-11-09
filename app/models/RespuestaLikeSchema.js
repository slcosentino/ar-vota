var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var respuestaLikeSchema = new Schema({
  id_respuesta: { type: String, required: true },
  id_usuario: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('respuestaLike', respuestaLikeSchema);

var mongoose = require('mongoose');
