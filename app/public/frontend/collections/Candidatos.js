define(function(require) {
  var Candidato = require('frontend/models/Candidato');

  return Backbone.Collection.extend({
    model: Candidato,
    url: '/api/usuarios/candidatos'
  });
});
