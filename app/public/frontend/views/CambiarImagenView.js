define(function(require) {
  var template = require('text!frontend/templates/cambiar-imagen.html'),
      ErrorHelper = require('frontend/helpers/ErrorHelper'),
      UploadHelperView = require('helpers/UploadHelper/UploadHelperView');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #cambiar-button': 'cambiar',
      'click #subir-imagen-button': 'subirImagen'
    },

    render: function() {
      this.$el.html(this.template());

      return this;
    },

    cambiar: function(event) {
      event.preventDefault();
      
      if (this.uploadHelperView) {
        this.imagen = this.uploadHelperView.getImage();
      }
      
      view = this;
      $.ajax({
        method: 'PUT',
        url: '/api/usuarios/imagenes',
        contentType: 'application/json',
        data: JSON.stringify({
          'imagen_perfil': view.imagen 
        })
      })
      .done(function(data, textStatus, jqXHR) {
        url = '#usuarios/' + data.id_usuario;
        Backbone.history.navigate(url,true);

      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        ErrorHelper.showError(jqXHR);
      });
    },

    subirImagen: function(event) {
      event.preventDefault();
      this.uploadHelperView = new UploadHelperView();
      this.$('#upload-container').html(this.uploadHelperView.render().$el);
    }
  });
});
