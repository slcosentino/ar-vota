define(function(require) {
  var Comentario = require('frontend/models/Comentario');

  return Backbone.Collection.extend({
    model: Comentario,
    comparator: function(item) {
      return -((new Date(item.get('fechaCreacion'))).getTime());
    }
  });
});
