var mongoose = require('mongoose');

var EncuestaUsuarioSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('EncuestaUsuario', EncuestaUsuarioSchema);
