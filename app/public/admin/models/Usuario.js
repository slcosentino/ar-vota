define(function() {
  return Backbone.Model.extend({
    parse: function(response) {
      response.id = response.id_usuario;
      return response;
    }
  });
});
