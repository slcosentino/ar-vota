define(function() {
  return Backbone.Model.extend({
    url: '/api/admin/encuestas',
    parse: function(response) {
      response.id = response._id;
      return response;
    }
  });
});
