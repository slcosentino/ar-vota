define(function(require) {
  var template = require('text!frontend/templates/register.html'),
      Provincias = require('frontend/collections/Provincias'),
      ErrorHelper = require('frontend/helpers/ErrorHelper'),
      UploadHelperView = require('helpers/UploadHelper/UploadHelperView');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #register-button': 'register',
      'click #subir-imagen-button': 'subirImagen'
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
      var error = this.verificar();

      if (error != '')
        alert(error);

      if (this.uploadHelperView) {
        this.imagen_perfil = this.uploadHelperView.getImage();
      }

      if (error == ''){

        var view = this;
        $.ajax({
          method: 'POST',
          url: '/api/usuarios/registro',
          contentType: 'application/json',
          data: JSON.stringify({
          'nombre': view.$('#nombre').val(),
          'apellido': view.$('#apellido').val(),
          'ano_nacimiento': view.$('#ano_nacimiento').val(),
          'id_usuario': view.$('#id_usuario').val(),
          'password': view.$('#password').val(),
          'email':view.$('#email').val(),
          'esCiudadano': view.$('#tipo_usuario').val(),
          'imagen_perfil': view.imagen_perfil
          })
        })
        .done(
            function(data, textStatus, jqXHR) {
              window.location.replace('/');
            })
        .fail(function(jqXHR, textStatus, errorThrown) {
          ErrorHelper.showError(jqXHR);
        });				

      }



    },

    verificar: function(){

      if ($('#nombre').val() == '')
        return 'Debe ingresar un nombre';

      if ($('#apellido').val() == '')
        return 'Debe ingresar un apellido';

      if ($('#id_usuario').val() == '')
        return 'Debe ingresar un usuario';

      if ($('#email').val() == '')
        return 'Debe ingresar un email';

      if ($('#provincia-select').val() == '')
        return 'Debe ingresar una provincia de residencia';

      if ($('#ciudad-select').val() == '')
        return 'Debe ingresar una ciudad de residencia';

      if ($('#password').val() == '')
        return 'Debe ingresar una contrase&ntilde;e';		

      if ($('#password').val() != $('#password').val())
        return 'Las contrase&ntilde; ingresadas no coinciden';

      return '';
    },

    subirImagen: function(event) {
      event.preventDefault();
      this.uploadHelperView = new UploadHelperView();
      this.$('#upload-container').html(this.uploadHelperView.render().$el);
    }

  });
});
