define(function(require) {
  var template = require('text!frontend/templates/Propuestas/overview.html'),
      Propuesta = require('frontend/models/Propuesta'),
      ErrorHelper = require('frontend/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #guardar-comentario-button': 'comentar',
      'click #cancelar-comentario-button': 'limpiarComentario',
      'click #likePropuesta-button': 'likePropuesta',
      'click #disLikePropuesta-button': 'disLikePropuesta'
    },

    render: function() {
		this.model = new Propuesta();
		this.model.urlRoot = '/api/propuestas/' + 'pepe';

        this.listenTo(this.model, 'change', this.renderModel);

        this.model.fetch({
          error: function(collection, xhr, options) {
            ErrorHelper.showError(xhr);
          }
        });
		return this;
    },
	
    renderModel: function() {
        this.$el.html(this.template(this.model.attributes));
    },
	  
	// comentar: function(event) {
		// event.preventDefault();
			// view = this;
			// $.ajax({
				// method: 'POST',
				// url: '/api/propuestas/comentar/' + this._id,
				// contentType: 'application/json',
				// data: JSON.stringify({
				// 'comentario': view.$('#comentario').val()})
			// })
			// .done(
			// function(data, textStatus, jqXHR) {
				// window.location.replace('/');
			// })
			// .fail(function(jqXHR, textStatus, errorThrown) {
			  // ErrorHelper.showError(jqXHR);
			// });
	// },
	  
	likePropuesta: function(event) {
		event.preventDefault();
		view = this;
		$.ajax({
			method: 'PUT',
			url: '/api/propuestas/like/' + 'pepe',
			contenttype: 'application/json',
			data: JSON.stringify({})
		})
		.done()
		.fail(function(jqXHR, textStatus, errorThrown) {
		  ErrorHelper.showError(jqXHR);
		});
	},
	
	disLikePropuesta: function(event) {
		event.preventDefault();
		view = this;
		$.ajax({
			method: 'PUT',
			url: '/api/propuestas/disLike/' + 'pepe',
			contentType: 'application/json',
			data: JSON.stringify({})
		})
		.done()
		.fail(function(jqXHR, textStatus, errorThrown) {
		  ErrorHelper.showError(jqXHR);
		});
	}
  });
});
