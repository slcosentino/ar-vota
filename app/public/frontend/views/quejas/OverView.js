define(function(require) {
  var template = require('text!frontend/templates/quejas/overview.html'),
      Queja = require('frontend/models/Queja'),
	  Comentarios = require('frontend/collections/Comentarios'),
      ComentarioView = require('frontend/views/quejas/ComentarioView'),
      ErrorHelper = require('frontend/helpers/ErrorHelper');


  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #guardar-comentario-button': 'comentar',
      'click #cancelar-comentario-button': 'limpiarComentario',
      'click #likeQueja-button': 'likeQueja',
      'click #disLikeQueja-button': 'disLikeQueja'
    },

    render: function() {
		this.model = new Queja();
		this.collection = new Comentarios();
	    this.listenTo(this.collection, 'reset', this.renderCollection);
		this.model.urlRoot = '/api/quejas/' + this.id;
		this.listenTo(this.collection, 'add', this.refresh);
        this.listenTo(this.model, 'change', this.renderModel);

        this.model.fetch({
          error: function(collection, xhr, options) {
            ErrorHelper.showError(xhr);
          }
        });
        this.collection.fetch({
		  reset: true,
		  error: function(collection, xhr, options) {
		    ErrorHelper.showError(xhr);
		  }
	    });
        return this;
    },
	
	refresh: function() {
		Backbone.history.loadUrl();
		return false;
	},
	
    renderModel: function() {
        this.$el.html(this.template(this.model.attributes));
    },
	  
	  comentar: function(event) {
      event.preventDefault();
      view = this;
      $.ajax({
        method: 'POST',
        url: '/api/quejas/comentar/' + this.model.get('id'),
        contentType: 'application/json',
        data: JSON.stringify({
          'comentario': view.$('#comentario').val()})
      })
      .done(this.refresh)
        .fail(function(jqXHR, textStatus, errorThrown) {
          ErrorHelper.showError(jqXHR);
        });
    },

	  likeQueja: function(event) {
      event.preventDefault();
      view = this;
      $.ajax({
        method: 'PUT',
        url: '/api/quejas/like/' + this.model.get('id'),
        contenttype: 'application/json',
        data: JSON.stringify({})
      })
      .done(this.refresh)
        .fail(function(jqXHR, textStatus, errorThrown) {
          ErrorHelper.showError(jqXHR);
        });
    },

	  disLikeQueja: function(event) {
      event.preventDefault();
      view = this;
      $.ajax({
        method: 'PUT',
        url: '/api/quejas/disLike/' + this.model.get('id'),
        contenttype: 'application/json',
        data: JSON.stringify({})
      })
      .done(this.refresh)
        .fail(function(jqXHR, textStatus, errorThrown) {
          ErrorHelper.showError(jqXHR);
        });
    },

    renderCollection: function() { 
      this.collection.sort();

      this.collection.each(function(item) {
        this.renderItem(item);
      }, this);
    },

    renderItem: function(comentario) {
      var comentarioView = new ComentarioView({
        model: comentario,
        parent: this
       });
      this.$('#comentario-container').append(comentarioView.render().$el); 
    }
  });
});
