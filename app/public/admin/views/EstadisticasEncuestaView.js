define(function(require) {
  var template = require('text!admin/templates/estadisticas-encuesta.html'),
      ResultadoEncuesta = require('admin/collections/ResultadoEncuesta'),
      Encuesta = require('admin/models/Encuesta');
      PieChartView = require('admin/views/PieChartView'),
      EstadisticasPreguntaView = require('admin/views/EstadisticasPreguntaView');


  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #generar-button': 'generar'
    },

    render: function(){
      return this;
    },

    initialize: function(options){
      this.id_encuesta = options.id_encuesta;
      this.resultado = new ResultadoEncuesta();
      this.resultadosParsedArray = [];
      this.colors = [];
      this.highlights = [];
      this.clindex;
      this.hlindex;
      this.childViews = [];

      this.setColors();

      this.encuesta = new Encuesta();
      this.encuesta.url = this.encuesta.url + '/' + this.id_encuesta;

      this.listenTo(this.encuesta, 'change', this.renderEncuesta);

      this.encuesta.fetch({
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });

    },

    renderEncuesta: function() {
      this.resultado.url = this.resultado.url + '/'  + this.id_encuesta;
      this.listenTo(this.resultado, 'reset', this.parseResultado);

      this.resultado.fetch({
        reset: true,
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });

      this.$el.html(this.template(this.encuesta.attributes));
    },

    parseResultado: function() {
      this.resultado.each(function(resultado) {
        this.parsePregunta(resultado);
      }, this);

      var respuestasSeleccionadasArray = this.getRespuestasSeleccionadasArray();
      console.log(respuestasSeleccionadasArray);

      var preguntas = this.encuesta.get('preguntas');
      var view = this;

      for (var i = 0 ; i < preguntas.length ; i++) {
        var estadisticasPreguntaView = new EstadisticasPreguntaView({
          pregunta: preguntas[i],
          valores: view.getResultadoDePregunta(i),
          respuestasSeleccionadas: respuestasSeleccionadasArray[i]
        });


        this.childViews.push(estadisticasPreguntaView);
        this.$('#preguntas-container').append(estadisticasPreguntaView.render().el);
      }

    },

    getRespuestasSeleccionadasArray: function() {
      var respuestasSeleccionadasArray = [];

      var preguntas = this.encuesta.get('preguntas');

      for (var i = 0 ; i < preguntas.length ; i++) {
        var respuestasEncuesta = preguntas[i].respuestas;
        respuestasSeleccionadasArray[i] = [];

        for (var j = 0 ; j < respuestasEncuesta.length ; j++) {
          this.resultado.each(function(resultado) {
            var respuestasResultado = resultado.get('respuestas');
            respuestasSeleccionadasArray[i][j] = false;

            for (var k = 0 ; k < respuestasResultado.length ; k++) {
              if(respuestasEncuesta[j].nro_respuesta == respuestasResultado[k].nro_respuesta) {
                respuestasSeleccionadasArray[i][j] = true;
              }
            }
          }, this);
        }
      }
      return respuestasSeleccionadasArray;
    },

    parsePregunta: function(resultado) {
      this.hlindex = -1;
      this.clindex = -1;
      var respuestas = resultado.get('respuestas');
      var preguntas = this.encuesta.get('preguntas');
      var nro_pregunta = resultado.get('nro_pregunta');
      var total = this.encuesta.get('total');

      var values = [];

        for (var i = 0; i < respuestas.length ; i++) {
          var nro_respuesta = respuestas[i].nro_respuesta;
          var texto_respuesta = preguntas[nro_pregunta - 1].respuestas[nro_respuesta - 1].texto;
          var selecciones = respuestas[i].selecciones;

          var respuesta = {};
          respuesta.label = texto_respuesta;
          respuesta.value = Math.round(selecciones * 100 / total);
					respuesta.color = this.getColor();
					respuesta.highlight = this.getHighlight();

          values.push(respuesta);
        }

        this.resultadosParsedArray.push(values);
    },

    getResultadoDePregunta: function(pregunta) {
      return this.resultadosParsedArray[pregunta];
    },

    setColors: function() {
      this.colors.push('#F7464A');
      this.highlights.push('#FF5A5E');

      this.colors.push('#46BFBD');
      this.highlights.push('#5AD3D1');
      
      this.colors.push('#FDB45C');
      this.highlights.push('#FFC870');

      this.colors.push('#949FB1');
      this.highlights.push('#A8B3C5');

      this.colors.push('#4D5360');
      this.highlights.push('#616774');
    },

    getColor: function() {
      if (this.clindex > this.colors.length) {
        this.clindex = -1;
      }
      this.clindex++;
      return this.colors[this.clindex];
    },

    getHighlight: function() {
      if (this.hlindex > this.highlights.length) {
        this.hlindex = -1;
      }
      this.hlindex++;
      return this.highlights[this.hlindex];
    },

    generar: function() {
      this.$('#estadisticas-status').removeClass('hidden');

      var view = this;
      setTimeout(function(){
        view.$('#estadisticas-status').addClass('hidden');
        view.$('#preguntas-container').removeClass('hidden');
        for (var i = 0; i < view.childViews.length ; i++) {
          view.childViews[i].mostrarGrafico();
        }
      }, 1500);
    }
  });
});
