var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var comentarioSchema = new Schema({
  id_publicacion: { type: String, required: true },
  id_usuario: { type: String, required: true },
  descripcion: { type: String, required: true },
  cantidad_likes: { type: Number, default: 0 },
  cantidad_disLikes: { type: Number, default: 0 },
  fechaCreacion: { type: Date, default: Date.now },
  fechaModificacion: { type: String },
  imagen_perfil: { type: String}
});

module.exports = mongoose.model('Comentario', comentarioSchema);

var mongoose = require('mongoose');
