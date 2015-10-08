var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var quejaSchema = new Schema({
    id_usuario: { type: String, required: true },
	id_candidato: { type: String},
	titulo: { type: String, required: true },
	descripcion: { type: String, required: true },
	imagen: { type: String },
	cantidad_likes: { type: Number, default: 0 },
	cantidad_disLikes: { type: Number, default: 0 },
	fechaCreacion: { type: Date, default: Date.now },
	fechaModificacion: { type: String }
});

module.exports = mongoose.model('Queja', quejaSchema);

var mongoose = require('mongoose');
