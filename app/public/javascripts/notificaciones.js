/* notificaciones */
app = {};

$(document).ready(function() {
  consultar();
});

function consultar() {
  $.ajax({
    method: 'GET',
    url: '/api/notificaciones/',
    contentType: 'application/json',
  })
  .done(function(data, textStatus, jqXHR) {
    if (data.notificaciones == true) {
      if (data.encuestasNuevas) {
        app.encuestasNuevas = data.encuestasNuevas;
        notificar();
      }
    }
    if (data.notificaciones == false) {
      limpiarNotificaciones();
    }

    setTimeout(function() {
      consultar();
    }, 15000);
  })
  .fail(function(xhr, textStatus, errorThrown) {
    setTimeout(function() {
      consultar();
    }, 15000);
  });
}

function notificar(data) {
  $('#notificaciones').addClass('badge badge-encuestas');
  $('#notificaciones').html(app.encuestasNuevas);

  $('#notificacion-encuesta').addClass('badge');
  $('#notificacion-encuesta').html(app.encuestasNuevas);
}

function limpiarNotificaciones() {
  $('#notificacion').removeClass('badge badge-encuestas');
  $('#notificacion').html('');

  $('#notificacion-encuesta').removeClass('badge');
  $('#notificacion-encuesta').html('');
}
