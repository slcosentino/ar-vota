define(function(require) {
  var template = require('text!admin/templates/preview-encuesta.html'),
      Encuesta = require('admin/models/Encuesta');


  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

    render: function() {
      this.model = new Encuesta();
      this.model.url = this.model.url + '/' + this.id_encuesta;

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

  });
});
