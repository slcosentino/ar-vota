define(function(require) {
	var template = require('text!frontend/templates/Propuestas/propuestas.html'), 
	Propuestas = require('frontend/collections/Propuestas'), 
	PropuestaView = require('frontend/views/Propuestas/PropuestaView'), 
	ErrorHelper = require('frontend/helpers/ErrorHelper');

	return Backbone.View.extend({
		template : _.template(template),

		render : function() {
			this.$el.html(this.template());

			this.collection = new Propuestas();
			this.listenTo(this.collection, 'reset', this.renderCollection);

			this.collection.fetch({
				reset : true,
				error : function(collection, xhr, options) {
					ErrorHelper.showError(xhr);
				}
			});
			return this;

		},

		renderCollection : function() {
			var i = 0;
			this.collection.each(function(item, i) {
				this.renderItem(item, i);
			}, this);

			$(document).ready(function() {
				$('#propuestas-container').pinterest_grid({
					no_columns : 4,
					itemSelector : "article",
					// itemWidth: 50,
					align : "center",
					fitWidth : true,
					autoResize : true,

					padding_x : 10,
					padding_y : 10,
					margin_bottom : 10,
					single_column_breakpoint : 700

				});
			});

		},

		renderItem : function(item, i) {
			var propuestaView = new PropuestaView({
				model : item,
				id : "article-" + i
			});

			this.$('#propuestas-container').append(propuestaView.render().el);
			this.$('#article-' + i).addClass('white-panel');

		}

	});
});
