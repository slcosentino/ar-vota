define(function(require) {
  var template = require('text!frontend/templates/register.html'),
  		ProvinciasCiudades = require('frontend/collections/ProvinciaCiudad')
  		ErrorHelper = require('frontend/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #register-button': 'register'
    },
    
	initialize: function() {	 
	console.log("acaaaaaaaa");
	    this.provinciasCiudades = new ProvinciasCiudades();
	
	  
	    this.listenTo(this.provinciasCiudades, 'reset', this.setProvinciasCiudades);
	
	    this.provinciasCiudades.fetch({
	      reset: true
	    });
	    
	    
	},

    render: function() {	
      this.$el.html(this.template);
      return this;
    },
    
    setProvinciasCiudades: function() {
    	console.log("aca");
        console.log(this.provinciasCiudades);
        /*var topicos = [];
        var counter = 0;
        this.topicos.each(function(item) {
          topicos.push({id: counter, text: item.get('texto')});
          counter++;
        }, this);

        console.log(topicos)
          this.$('#topico-select').select2({
            theme: "bootstrap",
            data: topicos
          });
		*/
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
