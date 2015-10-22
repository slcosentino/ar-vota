define(function(require) {
  var template = require('text!frontend/templates/pregunta-encuesta.html');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    initialize: function(options) {
      this.parent = options.parent;
    },

    getSelection: function() {
      var selection = this.$('input[name=pregunta-' + this.model.attributes.nro_pregunta  + ']:checked').val();
      if (selection == undefined) {
        this.$('#panel-pregunta').removeClass('panel-default');
        this.$('#panel-pregunta').addClass('panel-danger');
      } else {
        this.$('#panel-pregunta').removeClass('panel-danger');
        this.$('#panel-pregunta').addClass('panel-default');
      }
      return selection;
    }

  });
});
