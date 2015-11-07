define(function(require) {
  var template = require('text!frontend/templates/perfil.html'),
      Usuario = require('frontend/models/Usuario'),
      ErrorHelper = require('frontend/helpers/ErrorHelper'),
      Publicaciones = require('frontend/collections/Publicaciones'),
      PublicacionView = require('frontend/views/PublicacionView');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #seguir-button': 'seguir'
    },

    render: function() {
      this.model = new Usuario();
      this.model.urlRoot = '/api/usuarios/' + this.id_usuario;

      this.listenTo(this.model, 'change', this.renderModel);

      this.model.fetch({
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });

      this.publicaciones = new Publicaciones();
      this.publicaciones.url = '/api/usuarios/' + this.id_usuario + '/publicaciones';
      this.listenTo(this.publicaciones, 'reset', this.renderPublicaciones);

      this.publicaciones.fetch({
        reset : true,
        error : function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });

      return this;
    },

    renderModel: function() {
      this.$el.html(this.template(this.model.attributes));
    },

    renderPublicaciones: function() {
      this.publicaciones.each(function(item) {
        this.renderPublicacion(item);
      }, this);

      this.$('#publicaciones-container').pinterest_grid({
        no_columns: 4,
        padding_x: 10,
        padding_y: 10,
        margin_bottom: 50,
        single_column_breakpoint: 700
      });
    },

    renderPublicacion: function(item) {
      var publicacionView = new PublicacionView({
        model: item
      });

      this.$('#publicaciones-container').append(publicacionView.render().el);
    },
    seguir: function() {
      view = this;
      $.ajax({
        method: 'POST',
        url: '/api/usuarios/seguimientos',
        contentType: 'application/json',
        data: JSON.stringify({
          'id_candidato': view.id_usuario
        })
      })
      .done(
        function(data, textStatus, jqXHR) {
          console.log('listo');
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        ErrorHelper.showError(jqXHR);
      });
    }
  });
});
