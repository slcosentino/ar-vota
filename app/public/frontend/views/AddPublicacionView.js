define(function(require) {
  var template = require('text!frontend/templates/add-publicacion.html'),
      ErrorHelper = require('frontend/helpers/ErrorHelper'),
      UploadHelperView = require('helpers/UploadHelper/UploadHelperView');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #publish-button': 'publish',
      'click #subir-imagen-button': 'subirImagen'
    },

    render: function() {
      if(this.propuesta) {
        this.tipo_publicacion = 'Propuesta';
        this.url = '/api/publicaciones/propuestas';
      } else {
        this.tipo_publicacion = 'Queja';
        this.url = '/api/publicaciones/quejas';
      }

      this.$el.html(this.template(this.tipo_publicacion));
      return this;
    },

    publish: function(event) {
      event.preventDefault();
      
      if (this.uploadHelperView) {
        this.imagen = this.uploadHelperView.getImage();
      }
      
      view = this;
      $.ajax({
        method: 'POST',
        url: view.url,
        contentType: 'application/json',
        data: JSON.stringify({
          'titulo': view.$('#titulo').val(),
          'descripcion': view.$('#descripcion').val(),
          'propuesta': view.propuesta,
          'imagen': view.imagen 
        })
      })
      .done(
          function(data, textStatus, jqXHR) {
            window.location.replace('/');
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
