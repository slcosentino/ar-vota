define(function(require) {
  var template = require('text!admin/templates/login.html'),
      ErrorHelper = require('admin/helpers/ErrorHelper');

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
      this.$('#login-status').removeClass('hidden');

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
        function(data, textStatus, jqXHR) {
            //window.location.hash = '#inicio';
            Backbone.history.navigate('#inicio', false);
            location.reload();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          view.$('#login-status').addClass('hidden');
          ErrorHelper.showError(jqXHR);
        });
    }
  });
});
