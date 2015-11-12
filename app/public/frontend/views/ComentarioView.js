define(function(require) {
  var template = require('text!frontend/templates/comentario.html');
      Comentario = require('frontend/models/Comentario'),
      Respuestas = require('frontend/collections/Respuestas'),
      RespuestaView = require('frontend/views/RespuestaView');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click [name=crear-respuesta-button]': 'crearRespuesta',
      'click #guardar-respuesta-button': 'guardarRespuesta',
      'click [name=cancelar-respuesta-button]': 'limpiarRespuesta',
      'click #likeComentario-button': 'likeComentario',
      'click #disLikeComentario-button': 'disLikeComentario'
    },

    render: function() {  
      this.collection = new Respuestas();

	  this.collection.url = '/api/publicaciones/' + this.model.id + '/respuestas';
	  this.listenTo(this.collection, 'reset', this.renderCollection);

	  this.model.urlRoot = '/api/publicaciones/comentarios/';
	  this.listenTo(this.collection, 'add', this.refresh);
	  //this.listenTo(this.model, 'change', this.$el.html(this.template(this.model.attributes)););
 
	  this.model.fetch({
	    error: function(collection, xhr, options) {
        ErrorHelper.showError(xhr);
	  }});
	
	  this.collection.fetch({
      reset: true,
      error: function(collection, xhr, options) {
        ErrorHelper.showError(xhr);
      }});

	  this.$el.html(this.template(this.model.attributes));
	  return this;
    },
	
	renderModel: function() {
      this.$el.html(this.template(this.model.attributes));
    },
	
	crearRespuesta: function(ev) {
      var id = $(ev.currentTarget).data('id');
      $("[data-id=crearRespuesta-" + id + "]").show();
	  $(ev.currentTarget).hide();
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
  
	limpiarRespuesta: function(ev) {
      var id = $(ev.currentTarget).data('id');
	  $("[data-id=crearRespuesta-" + id + "] textarea").val("");
	  $("[data-id=crearRespuesta-" + id + "]").hide();
	  $("[data-id=" + id + "]").show();
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
    },
	
	renderCollection: function() {
	  //this.collection.sort();

      this.collection.each(function(item) {
        this.renderItem(item);
      }, this);
	  
	  this.formatDate();
    },

    renderItem: function(respuesta) {
      var respuestaView = new RespuestaView({
        model: respuesta,
        parent: this
       });
      this.$('#respuestas-container').append(respuestaView.render().$el); 
    },
	
	formatDate: function() {
	  $(".fecha").each(function( index, value ) {
		$(value).html( $.format.date ( new Date ($(value).html()), 'dd-MMM-yyyy hh:mm'))
	  });
	}
  });
});


