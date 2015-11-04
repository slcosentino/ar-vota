define(function(require) {
  var template = require('text!frontend/templates/comentario.html');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #crear-respuesta-button': 'crearRespuesta',
      'click #guardar-respuesta-button': 'guardarRespuesta',
      'click #cancelar-respuesta-button': 'limpiarRespuesta',
	  'click #likeComentario-button': 'likeComentario',
      'click #disLikeComentario-button': 'disLikeComentario'
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
	
	crearRespuesta: function() {
		$("#crearRespuesta").show();
		$("#crear-respuesta-button").hide();
	},
	
	guardarRespuesta: function(event) {
      event.preventDefault();
      view = this;
      $.ajax({
        method: 'POST',
        url: '/api/publicaciones/' + this.model.get('id') + '/respuestas',
        contentType: 'application/json',
        data: JSON.stringify({
          'descripcion': view.$('#respuestaDescripcion').val()})
      })
      .done(this.refresh)
	  .fail(function(jqXHR, textStatus, errorThrown) {
          ErrorHelper.showError(jqXHR);
      });
    },
	
	refresh: function() {
		Backbone.history.loadUrl();
		return false;
	},
  
	limpiarRespuesta: function() {
		$("#respuestaDescripcion").val("");
	},
	
	likeComentario: function(event) {
      event.preventDefault();
      view = this;
      $.ajax({
        method: 'PUT',
        url: '/api/publicaciones/likeComentario/' + this.model.get('id'),
        contenttype: 'application/json',
        data: JSON.stringify({})
      })
      .done( function(data){
		  	  $("[data-id=likeComentario-" + data._id + "]").html(data.cantidad_likes + 1);
		})
      .fail(function(jqXHR, textStatus, errorThrown) {
		  ErrorHelper.showError(jqXHR);
        });
    },

    disLikeComentario: function(event) {
      event.preventDefault();
      view = this;
      $.ajax({
        method: 'PUT',
        url: '/api/publicaciones/disLikeComentario/' + this.model.get('id'),
        contenttype: 'application/json',
        data: JSON.stringify({})
      })
      .done( function(data){
		  	  $("[data-id=disLikeComentario-" + data._id + "]").html(data.cantidad_disLikes + 1);
		})
      .fail(function(jqXHR, textStatus, errorThrown) {
          ErrorHelper.showError(jqXHR);
        });
    }
  });
});
