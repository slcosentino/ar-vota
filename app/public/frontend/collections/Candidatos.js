define(function(require) {
  var Usuario = require('frontend/models/Usuario');;

  return Backbone.Collection.extend({
    model: Usuario,
    url: '/api/usuarios'
  });
});
