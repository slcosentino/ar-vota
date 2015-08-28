define(function(require) {
  var Usuario = require('admin/models/Usuario');

  return Backbone.Collection.extend({
    model: Usuario,
    url: '/api/admin/usuarios'
  });
});
