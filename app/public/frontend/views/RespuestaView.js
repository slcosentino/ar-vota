define(function(require) {
  var template = require('text!frontend/templates/respuesta.html');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
	  'click #likeRespuesta-button': 'likeRespuesta',
      'click #disLikeRespuesta-button': 'disLikeRespuesta'
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
	
	likeRespuesta: function(event) {
      event.preventDefault();
      view = this;
      $.ajax({
        method: 'PUT',
        url: '/api/publicaciones/likeRespuesta/' + this.model.get('id'),
        contenttype: 'application/json',
        data: JSON.stringify({})
      })
      .done( function(data){
		  	  $("[data-id=likeRespuesta-" + data._id + "]").html(data.cantidad_likes + 1);
		})
      .fail(function(jqXHR, textStatus, errorThrown) {
		  ErrorHelper.showError(jqXHR);
        });
    },

    disLikeRespuesta: function(event) {
      event.preventDefault();
      view = this;
      $.ajax({
        method: 'PUT',
        url: '/api/publicaciones/disLikeRespuesta/' + this.model.get('id'),
        contenttype: 'application/json',
        data: JSON.stringify({})
      })
      .done( function(data){
		  	  $("[data-id=disLikeRespuesta-" + data._id + "]").html(data.cantidad_disLikes + 1);
		})
      .fail(function(jqXHR, textStatus, errorThrown) {
          ErrorHelper.showError(jqXHR);
        });
    }
  });
});
