var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var comentarioDisLikeSchema = new Schema({
  id_comentario: { type: String, required: true },
  id_usuario: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('comentarioDisLike', comentarioDisLikeSchema);

var mongoose = require('mongoose');
