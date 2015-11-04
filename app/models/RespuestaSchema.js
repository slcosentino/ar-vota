var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var respuestaSchema = new Schema({
  id_comentario: { type: String, required: true },
  id_usuario: { type: String, required: true },
  descripcion: { type: String, required: true },
  cantidad_likes: { type: Number, default: 0 },
  cantidad_disLikes: { type: Number, default: 0 },
  fechaCreacion: { type: Date, default: Date.now },
  fechaModificacion: { type: String }
});

module.exports = mongoose.model('Respuesta', respuestaSchema);

var mongoose = require('mongoose');
