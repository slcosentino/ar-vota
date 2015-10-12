define(function(require) {
	var template = require('text!frontend/templates/Quejas/quejas.html'), 
	Quejas = require('frontend/collections/Quejas'), 
	QuejaView = require('frontend/views/Quejas/QuejaView'), 
	ErrorHelper = require('frontend/helpers/ErrorHelper');

	return Backbone.View.extend({
		template : _.template(template),

		render : function() {
			this.$el.html(this.template());

			this.collection = new Quejas();
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
				$('#quejas-container').pinterest_grid({
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
			var quejaView = new QuejaView({
				model : item,
				id : "article-" + i
			});

			this.$('#quejas-container').append(quejaView.render().el);
			this.$('#article-' + i).addClass('white-panel');

		}

	});
});
