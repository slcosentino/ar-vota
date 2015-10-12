define(function(require) {
  var Usuario = require('frontend/models/Publicacion');

  return Backbone.Collection.extend({
    model: Usuario,
    url: '/api/publicaciones'
  });
});
