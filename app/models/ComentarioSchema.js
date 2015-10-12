var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var comentarioSchema = new Schema({
  id_publicacion: { type: String, required: true },
  id_usuario: { type: String, required: true },
  texto: { type: String, required: true },
  cantidad_likes: { type: Number, default: 0 },
  cantidad_dislikes: { type: Number, default: 0 },
  fechaCreacion: { type: Date, default: Date.now },
  fechaModificacion: { type: String }
});

module.exports = mongoose.model('Comentario', comentarioSchema);

var mongoose = require('mongoose');
