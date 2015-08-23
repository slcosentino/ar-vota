define(function(require) {
  var template = require('text!admin/templates/login.html');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #login-button': 'login'
    },

    render: function() {
      this.$el.html(this.template);
      return this;
    },

    login: function(event) {
      event.preventDefault();
      view = this;
      $.ajax({
        method: 'POST',
        url: '/api/admin/login',
        contentType: 'application/json',
        data: JSON.stringify({
          'id_usuario': view.$('#id_usuario').val(),
          'password': view.$('#password').val()})
      })
      .done(
        function() {
          console.log('Esta logueado');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          var errorObject = $.parseJSON(jqXHR.responseText);
          console.log(errorObject.status);
          console.log(errorObject.message);
        });
    }
  });
});
