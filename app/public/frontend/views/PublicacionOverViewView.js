define(function(require) {
  var template = require('text!frontend/templates/publicacion-overview.html'),
      Publicacion = require('frontend/models/Publicacion'),
      Comentarios = require('frontend/collections/Comentarios'),
      ComentarioView = require('frontend/views/ComentarioView'),
      ErrorHelper = require('frontend/helpers/ErrorHelper'),
      SuccessHelper = require('helpers/SuccessHelper');


  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #guardar-comentario-button': 'comentar',
      'click #cancelar-comentario-button': 'limpiarComentario',
         'click #likePublicacion-button': 'likePropuesta',
         'click #disLikePublicacion-button': 'disLikePropuesta',
         'click #aceptar-queja-button': 'aceptarQueja',
         'click #eliminar-button': 'eliminar'
    },

    initialize: function() {
      this.childViews = [];
    },
    
    render: function() {
      this.model = new Publicacion();
      this.collection = new Comentarios();

      this.collection.url = '/api/publicaciones/' + this.id_publicacion + '/comentarios';
      this.listenTo(this.collection, 'reset', this.renderCollection);

      this.model.urlRoot = '/api/publicaciones/' + this.id_publicacion;
      this.listenTo(this.collection, 'add', this.refresh);
      this.listenTo(this.model, 'change', this.renderModel);

      this.model.fetch({
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }});

      return this;
    },

    refresh: function() {
      Backbone.history.loadUrl();
      return false;
    },

    limpiarComentario: function() {
      $("#comentarioDescripcion").val("");
    },

    renderModel: function() {
      this.$el.html(this.template(this.model.attributes));
      this.collection.fetch({
        reset: true,
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }});
    },

    comentar: function(event) {
      event.preventDefault();
      view = this;
      $.ajax({
        method: 'POST',
        url: '/api/publicaciones/' + this.model.get('id') + '/comentarios',
        contentType: 'application/json',
        data: JSON.stringify({
          'descripcion': view.$('#comentarioDescripcion').val()})
      })
      .done(this.refresh)
        .fail(function(jqXHR, textStatus, errorThrown) {
          ErrorHelper.showError(jqXHR);
        });
    },

    likePropuesta: function(event) {
      event.preventDefault();
      view = this;
      $.ajax({
        method: 'PUT',
        url: '/api/publicaciones/' + this.model.get('id') + '/like',
        contenttype: 'application/json',
        data: JSON.stringify({})
      })
      .done( function(data){
        $("#likePublicacion").html(data.cantidad_likes + 1);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        ErrorHelper.showError(jqXHR);
      });
    },

    disLikePropuesta: function(event) {
      event.preventDefault();
      view = this;
      $.ajax({
        method: 'PUT',
        url: '/api/publicaciones/' + this.model.get('id') + '/disLike',
        contenttype: 'application/json',
        data: JSON.stringify({})
      })
      .done( function(data){
        $("#disLikePublicacion").html(data.cantidad_disLikes + 1);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        ErrorHelper.showError(jqXHR);
      });
    },

    renderCollection: function() {
      this.collection.sort();

      this.collection.each(function(item) {
        this.renderItem(item);
      }, this);

      this.formatDate();
    },

    renderItem: function(comentario) {
      var comentarioView = new ComentarioView({
        model: comentario,
      parent: this
      });

      this.childViews.push(comentarioView);
      this.$('#comentarios-container').append(comentarioView.render().$el); 
    },

    formatDate: function() {
      $(".fecha").each(function( index, value ) {
        $(value).html( $.format.date ( new Date ($(value).html()), 'dd-MMM-yyyy hh:mm'))
      });
    },

    aceptarQueja: function() {
      view = this;
      $.ajax({
        method: 'POST',
        url: '/api/publicaciones/' + this.model.get('id') + '/aceptaciones',
        contentType: 'application/json',
        data: JSON.stringify({
        })
      })
      .done(function(data, textStatus, jqXHR) {
        view.$('#aceptar-queja-button').addClass('disabled');
        SuccessHelper.show(data.message);

      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        ErrorHelper.showError(jqXHR);
      });
    },

    onClose: function() {
      for (var i = 0 ; i < this.childViews.length ; i++) {
        this.childViews[i].close();
      }
    },

    eliminar: function() {
      view = this;
      $.ajax({
        method: 'DELETE',
        url: '/api/admin/publicaciones',
        contentType: 'application/json',
        data: JSON.stringify({
          id_publicacion: this.model.get('id')
        })
      })
      .done(function(data, textStatus, jqXHR) {
        view.$('#eliminar-button').addClass('disabled');
        SuccessHelper.show(data.message);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        ErrorHelper.showError(jqXHR);
      });
    },
  });
});
