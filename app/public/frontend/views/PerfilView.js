define(function(require) {
  var template = require('text!frontend/templates/perfil.html'),
      Usuario = require('frontend/models/Usuario'),
      ErrorHelper = require('frontend/helpers/ErrorHelper'),
      Publicaciones = require('frontend/collections/Publicaciones'),
      PublicacionView = require('frontend/views/PublicacionView'),
      GridView = require('frontend/views/GridView'),
      UsuarioAccion = require('frontend/models/UsuarioAccion');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click .seguir-button': 'seguir'
    },

    render: function() {
      this.model = new Usuario();
      this.acciones = new UsuarioAccion();

      this.model.urlRoot = '/api/usuarios/' + this.id_usuario;

      this.listenTo(this.model, 'change', this.renderModel);
      this.listenTo(this.acciones, 'change', this.renderAcciones);

      this.model.fetch({
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });

      return this;
    },

    renderModel: function() {
      this.$el.html(this.template(this.model.attributes));
      
      var gridView = new GridView({
        todas: true,
        propuestas: true,
        populares: false
      });

      this.$('#grid-container').append(gridView.render().el);

      this.acciones.fetch({
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
    },

    renderAcciones: function(){
      var candidatosSeguidos = this.acciones.get('id_candidatos_seguidos');

      for (var i = 0; i < candidatosSeguidos.length ; i++) {
        if (candidatosSeguidos[i] === this.id_usuario){
        this.$('.seguir-button')
        .html('<i class="fa fa-heart"></i>')
        .addClass('disabled');
        }
      }
      
    },

    seguir: function() {
      this.$('.seguir-button')
        .html('<i class="fa fa-spinner fa-spin"></i>&nbsp Seguir');
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
          view.$('.seguir-button')
            .html('<i class="fa fa-check"></i>&nbsp Seguir');
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        view.$('.seguir-button')
        .html('<i class="fa fa-heart"></i>&nbsp Seguir');
        ErrorHelper.showError(jqXHR);
      });
    }
  });
});
