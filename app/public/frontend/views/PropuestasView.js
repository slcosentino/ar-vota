define(function(require) {
  var template = require('text!frontend/templates/propuestas.html'),
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
	
	// $(".js-ListaCandidatos").select2({
		// ajax: {
			// url: "/api/usuarios/",
			// dataType: 'json',
			// delay: 250,
			// data: function (params) {
				// return {
					// q: params.term, // search term
					// page: params.page
				// };
			// },
			// processResults: function (data, page) {
				// // parse the results into the format expected by Select2.
				// // since we are using custom formatting functions we do not need to
				// // alter the remote JSON data
				// return {
				// results: data.items
				// };
			// },
			// cache: true
		// },
		// escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
		// minimumInputLength: 1,
		// templateResult: formatRepo, // omitted for brevity, see the source of this page
		// templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
	// });
	
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
