var mongoose = require('mongoose');

var UsuarioEncuestaSchema = new mongoose.Schema({
    id_usuario: { type: String, required: true},
    ano_nacimiento: { type: String, required: true},
    zona: { type: String, required: true},
    id_encuesta: { type: String, required: true},
    topico: { type: String, required: true},
    titulo: { type: String, required: true},
    fechaCreacion: { type: Date },
    fechaModificacion: { type: Date, default: Date.now },
    preguntas: [{
      _id: false,
      nro_pregunta: { type: Number },
      texto: { type: String, required: true},
      respuestas: [{
        _id: false,
        nro_respuesta: { type: Number },
        texto: { type: String, required: true},
        seleccionada: {type: Boolean, default: false}
      }]
    }],
}, {collection: 'usuarioencuestas'});

module.exports = mongoose.model('UsuarioEncuesta', UsuarioEncuestaSchema);
