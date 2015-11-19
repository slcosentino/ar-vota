define(function(require) {
  var Publicacion = require('frontend/models/Publicacion');

  return Backbone.Collection.extend({
    model: Publicacion,
    url: '/api/publicaciones/aceptadas',
    comparator: function(item) {
      return -((new Date(item.get('fechaCreacion'))).getTime());
    }
  });
});
