define(function(require) {
  var template = require('text!frontend/templates/register.html'),
  		Provincias = require('frontend/collections/Provincias')
  		ErrorHelper = require('frontend/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #register-button': 'register'
    },
    
	initialize: function() {
	    this.provincias = new Provincias();
	    this.listenTo(this.provincias, 'reset', this.setProvincias);
	
	    this.provincias.fetch({
	      reset: true
	    });
	    
	    
	},

    render: function() {	
      this.$el.html(this.template);
      
    /*  $("#register-form").validate({
    	    
          // Specify the validation rules
          rules: {
              nombre: "required",
              apellido: "required"			       
          },
          
          // Specify the validation error messages
          messages: {
              nombre: "Please enter your first name",
              apellido: "Please enter your last name"			
          },
          
          submitHandler: function(form) {
              //form.submit();
          }
      });*/
      
      
      return this;
    },
    
    setProvincias: function() {
    	
        var provincias = [];     
        
        provincias["Seleccione.."] = [];        
        provincias["Seleccione.."].push('');
        
        this.provincias.each(function(item) {
        	
        	provincias[item.get('provincia')] = [];
        	$.each( item.get('ciudades'), function( key, value ) {
        		if (value != undefined )
        			provincias[item.get('provincia')].push(value.ciudad);
        	});        	
       
        }, this);        
        
		 this.$('#provincia-select').select2({
			 theme: "bootstrap",
			 data: Object.keys(provincias)
		 });
		 
         this.$('#provincia-select').change(function() { 
        	 
        	 $('#ciudad-select').find('option').remove();
        	 
        	  $('#ciudad-select').select2({
                  theme: "bootstrap",
                  data: provincias[$('#provincia-select').val()]
               });
         });		
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
