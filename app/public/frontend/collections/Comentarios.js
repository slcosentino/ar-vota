define(function(require) {
  var Comentario = require('frontend/models/Comentario');

  return Backbone.Collection.extend({
    model: Comentario
  });
});
