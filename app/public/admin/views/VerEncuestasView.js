define(function(require) {
  var template = require('text!admin/templates/ver-encuestas.html'),
      Encuestas = require('admin/collections/Encuestas'),
      ItemEncuestaView = require('admin/views/ItemEncuestaView');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

    initialize: function() {
      this.encuestas = new Encuestas();
      this.listenTo(this.encuestas, 'reset', this.renderEncuestas);

      this.encuestas.fetch({
        reset: true
      });
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    renderEncuestas: function() {
     this.encuestas.each(function(item) {
      this.renderItem(item);
     console.log(item); 
      }, this);
    },

    renderItem: function(item) {
     var itemEncuestaView = new ItemEncuestaView({
       model: item
     });

     this.$('#item-encuestas-container').append(itemEncuestaView.render().el);

    }
  });
});
