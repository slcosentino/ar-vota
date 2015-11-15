define(function(require) {
  var Usuario = require('frontend/models/Publicacion');

  return Backbone.Collection.extend({
    model: Usuario,
    url: '/api/publicaciones',
    comparator: function(item) {
      return -((new Date(item.get('fechaCreacion'))).getTime());
    }
  });
});
