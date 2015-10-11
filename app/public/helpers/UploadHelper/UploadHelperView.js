define(function(require) {
  var template = require('text!helpers/UploadHelper/upload-helper.html'),
      ErrorHelper = require('helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #upload-button': 'upload'
    },

    render: function() {
      this.$el.html(this.template);
      return this;
    },

    upload: function(event) {
      this.$('#status').html('Subiendo imagen...');
      event.preventDefault();
      var form = this.$('#upload-form')[0];
      var formData = new FormData(form);
      
      var view = this;
      $.ajax({
        method: 'POST',
        url: '/api/images',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
      })
      .done(
        function(data, textStatus, jqXHR) {
          view.$('#status').html('<span class="text-success">Imagen subida con éxito ' + '<span class="glyphicon glyphicon-ok"></span></span>');
          view.$('#upload-button').prop('disabled', true);

          view.imageId = data.id;
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          ErrorHelper.showError(jqXHR);
        });
    },

    getImage: function() {
      return this.imageId;
    }

  });
});
