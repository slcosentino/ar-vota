define(function(require) {
  var template = require('text!frontend/templates/Propuestas/add.html'),
      ErrorHelper = require('frontend/helpers/ErrorHelper');
      Candidatos = require('frontend/collections/Candidatos');
      Usuarios = require('frontend/collections/Usuarios');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #publish-button': 'publish'
    },
	
    initialize: function() {
      this.usuarios = new Usuarios();
      this.listenTo(this.usuarios, 'reset', this.setCandidatos);
      this.usuarios.fetch({
        reset: true
      });
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
			'id_usuario': view.$('#id_usuario').val(), //El id de usuario lo obtenes en la carga de la pagina principal
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
	},
	
    setCandidatos: function() {
      console.log(this.usuarios);
      var usuarios = [];
      var counter = 0;
      this.usuarios.each(function(item) {
        usuarios.push({id: counter, text: item.get('id_usuario')});
        counter++;
      }, this);
	  
      console.log(this.usuarios);

        this.$('#candidato-select').select2({
          theme: "bootstrap",
          data: usuarios
        });
    },
	
  });
});
