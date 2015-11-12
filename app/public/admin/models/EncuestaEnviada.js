define(function() {
  return Backbone.Model.extend({
    url: '/api/encuestas/enviadas',
    parse: function(response) {
      response.id = response._id;
      return response;
    }
  });
});
