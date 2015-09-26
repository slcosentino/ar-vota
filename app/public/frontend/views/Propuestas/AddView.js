define(function(require) {
  var template = require('text!frontend/templates/Propuestas/add.html'),
      ErrorHelper = require('frontend/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #publish-button': 'publish'
    },

    render: function() {
		this.$el.html(this.template);
		return this;
    },
	
	publish: function(event) {
		event.preventDefault();
		view = this;
		$.ajax({
			method: 'POST',
			url: '/api/propuestas/',
			contentType: 'application/json',
			data: JSON.stringify({
			'id_usuario': view.$('#id_usuario').val(),
			'titulo': view.$('#titulo').val(),
			'descripcion': view.$('#descripcion').val()})
		})
		.done(
		function(data, textStatus, jqXHR) {
			window.location.replace('/');
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
		  ErrorHelper.showError(jqXHR);
		});
	}
	

	
	// Backbone.TemplateManager.baseUrl = 'templates/{name}';
	 
	// // Create the upload manager
	// var uploadManager = new Backbone.UploadManager({
		// 'uploadUrl': '/upload',
		// 'templates': {
			// 'main': 'upload-manager.main',
			// 'file': 'upload-manager.file'
		// }
	// });
	 
	// // Render it
	// uploadManager.renderTo($('div#uploadFile'));
	
	// // On file uploaded, refresh list.
	// uploadManager.on('filedone', function () {
		// $.get('/files').done(function(result){
			// var target = $('ul#file-list').empty();
			
			// $.each(result, function (index, file) {
				// target.append(
					// '<li>'+file.name+' ('+file.size+' bytes) '+
					// '<a href="'+file.download_url+'">Downlooad<a>'+
					// '</li>'
				// );
			// });
		// });
	// });
  });
});
