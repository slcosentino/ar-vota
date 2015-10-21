define(function(require) {
  var Encuesta = require('frontend/models/Encuesta');

  return Backbone.Collection.extend({
    url: function() {
      return 'api/usuarios/encuestas/nuevas';
    },
    model: Encuesta,
    comparator: function(item) {
      return item.id;
    }
  });
});
