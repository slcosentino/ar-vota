var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var respuestaDisLikeSchema = new Schema({
  id_respuesta: { type: String, required: true },
  id_usuario: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('respuestaDisLike', respuestaDisLikeSchema);

var mongoose = require('mongoose');
