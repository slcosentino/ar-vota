define(function(require) {
  var template = require('text!frontend/templates/register.html'),
      ErrorHelper = require('frontend/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #register-button': 'register'
    },

    render: function() {	
      this.$el.html(this.template);
      return this;
    },
		
	register: function(event) {
		event.preventDefault();
			view = this;
			$.ajax({
				method: 'POST',
				url: '/api/usuarios/registro',
				contentType: 'application/json',
				data: JSON.stringify({
				'id_usuario': view.$('#id_usuario').val(),
				'password': view.$('#password').val(),
				'nombre': view.$('#nombre').val(),
				'admin': 0,
				'email':view.$('#email').val(),
				'fechaCreacion': '01/01/2000',
				'esCiudadano': view.$('#tipo_usuario').val(),
				'apellido': view.$('#apellido').val()})
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
