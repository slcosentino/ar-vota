var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var propuestaSchema = new Schema({
    id_usuario: { type: String, required: true },
	titulo: { type: String, required: true },
	descripcion: { type: String, required: true },
	imagen: { type: String },
	cantidad_likes: { type: Number, default: 0 },
	cantidad_disLikes: { type: Number, default: 0 },
	fechaCreacion: { type: Date, default: Date.now },
	fechaModificacion: { type: String }
});

module.exports = mongoose.model('Propuesta', propuestaSchema);

var mongoose = require('mongoose');
