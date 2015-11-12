define(function(require) {
  var template = require('text!admin/templates/estadisticas-pregunta.html'),
      ErrorHelper = require('admin/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

    initialize: function(options) {
      this.pregunta = options.pregunta;
      this.valores = options.valores;
    },

    render: function() {
      this.$el.html(this.template(this.pregunta));
      
      var valores = this.valores;
      var pieChartView = new PieChartView({
       values: valores
     });

      this.$('#chart-container').append(pieChartView.render().el);

      return this;
    }
  });
});
