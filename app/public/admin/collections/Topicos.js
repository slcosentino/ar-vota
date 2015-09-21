define(function(require) {
  var Topico = require('admin/models/Topico');

  return Backbone.Collection.extend({
    url: '/api/admin/encuestas/topicos',
    model: Topico
  });
});
