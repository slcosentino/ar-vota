define(function(require) {
  var template = require('text!frontend/templates/comentario.html');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
	  'click #likeComentario-button': 'likeComentario',
      'click #disLikeComentario-button': 'disLikeComentario'
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
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
