var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var publicacionSchema = new Schema({
  id_usuario: { type: String, required: true },
  propuesta: { type: Boolean},
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String },
  cantidad_likes: { type: Number, default: 0 },
  cantidad_disLikes: { type: Number, default: 0 },
  fechaCreacion: { type: Date, default: Date.now },
  fechaModificacion: { type: Date },
  imagen_perfil: { type: String}
}, {collection: 'publicaciones'});

module.exports = mongoose.model('Publicacion', publicacionSchema);

var mongoose = require('mongoose');
