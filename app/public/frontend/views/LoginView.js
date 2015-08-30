define(function(require) {
  var template = require('text!frontend/templates/login.html'),
      ErrorHelper = require('frontend/helpers/ErrorHelper');

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
        url: '/api/usuarios/login',
        contentType: 'application/json',
        data: JSON.stringify({
          'id_usuario': view.$('#id_usuario').val(),
          'password': view.$('#password').val()})
      })
      .done(
        function(data, textStatus, jqXHR) {
            window.location.replace('/');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          ErrorHelper.showError(jqXHR);
        });
    }
    
  });
});
