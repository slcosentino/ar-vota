var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var publicacionSchema = new Schema({
  id_usuario: { type: String, required: true },
  propuesta: { type: Boolean},
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String, required: true },
  cantidad_likes: { type: Number, default: 0 },
  cantidad_disLikes: { type: Number, default: 0 },
  fechaCreacion: { type: Date, default: Date.now },
  fechaModificacion: { type: Date },
  imagen_perfil: { type: String},
  aceptada: {type: Boolean, default: false},
  aceptada_por: {type: String},
  eliminada: {type: Boolean, default: false}
}, {collection: 'publicaciones'});

module.exports = mongoose.model('Publicacion', publicacionSchema);

var mongoose = require('mongoose');
