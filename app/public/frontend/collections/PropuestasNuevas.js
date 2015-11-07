define(function(require) {
  var PropuestaNueva = require('frontend/models/PropuestaNueva');

  return Backbone.Collection.extend({
    url: function() {
      return 'api/usuarios/seguimientos/publicaciones';
    },
    model: PropuestaNueva,
    comparator: function(item) {
      return item.id;
    }
  });
});
