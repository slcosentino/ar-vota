define(function(require) {
  var template = require('text!admin/templates/verificar.html'),
      Usuarios = require('admin/collections/Usuarios'),
      PerfilView = require('admin/views/PerfilView');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'change #candidato-select': 'candidatoSeleccionado'
    },

    initialize: function() {
      this.candidatosArray =[]
      this.candidatosArray.push('Seleccione...');
      this.candidatos = new Usuarios();
      this.candidatos.url = this.candidatos.url + '/candidatos';

      this.listenTo(this.candidatos, 'reset', this.setCandidatos);

      this.$('#verificar-select-status').removeClass('hidden');
      this.candidatos.fetch({
        reset: true,
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    setCandidatos: function() {
      var counter = 0;
      this.candidatos.each(function(item) {
        this.candidatosArray.push({id: counter, text: item.get('id_usuario')});
        counter++;
      }, this);


      this.$('#candidato-select').select2({
        theme: "bootstrap",
        data: this.candidatosArray
      });

      this.$('#verificar-select-status').addClass('hidden');
    },

    candidatoSeleccionado: function(){
      this.$('#verificar-select-status').removeClass('hidden');
      var seleccion = this.$('#candidato-select').find('option:selected').text();
      var candidato = this.candidatos.where({id_usuario: seleccion})[0];

      var usuarioView = new PerfilView({
        verificar: true,
        model: candidato
      });

      setTimeout(function(){
        this.$('#candidato-container').html(usuarioView.render().$el); 
        this.$('#verificar-select-status').addClass('hidden');
      }, 1000);
    }

  });
});
