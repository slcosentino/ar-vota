define(function(require) {
  var Encuesta = require('frontend/models/Encuesta');

  return Backbone.Collection.extend({
    url: function() {
      return 'api/usuarios/encuestas/disponibles';
    },
    model: Encuesta,
    comparator: function(item) {
      return item.id;
    }
  });
});
