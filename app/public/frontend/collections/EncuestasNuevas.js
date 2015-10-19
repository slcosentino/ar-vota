define(function(require) {
  var Encuesta = require('frontend/models/Encuesta');

  return Backbone.Collection.extend({
    initialize: function(models, options) {
      this.options = options;
    },
    url: function() {
      return 'api/usuarios/' + this.options.id_usuario + '/encuestas/nuevas';
    },
    model: Encuesta,
    comparator: function(item) {
      return item.id;
    }
  });
});
