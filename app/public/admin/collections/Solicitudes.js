define(function(require) {
  return Backbone.Collection.extend({
    url: '/api/admin/verificaciones/solicitudes',
  });
});
