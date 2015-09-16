var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var propuestaSchema = new Schema({
  //id_usuario: { type: String, required: true },
	descripcion: { type: String, required: true },
	imagen: { type: String },
	cantidad_likes: { type: Number },
	cantidad_dislikes: { type: Number },
	fechaCreacion: { type: Date },
	fechaModificacion: { type: String, default: Date.now  }
});

module.exports = mongoose.model('Propuesta', propuestaSchema);

var mongoose = require('mongoose');
