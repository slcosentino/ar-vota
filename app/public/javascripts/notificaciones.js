/* notificaciones */
notificaciones = {
  encuestasNuevas: 0,
  publicacionesNuevas: 0
};

$(document).ready(function() {
 notificaciones.consultar();
});

notificaciones.consultar = function() {
  if (userObject.logueado = false) {
    console.log('deslogueado');
    return;
  }
  $.ajax({
    method: 'GET',
    url: '/api/notificaciones/',
    contentType: 'application/json',
  })
  .done(function(data, textStatus, jqXHR) {
    if (data.notificaciones == true) {
      if (data.encuestasNuevas) {
        notificaciones.encuestasNuevas = data.encuestasNuevas;
        notificaciones.notificar();
      }

      if (data.publicacionesNuevas) {
        notificaciones.publicacionesNuevas = data.publicacionesNuevas;
        notificaciones.notificar();
      }
    }
    if (data.notificaciones == false) {
      notificaciones.actualizarUI();
    }

    setTimeout(function() {
      notificaciones.consultar();
    }, 15000);
  })
  .fail(function(xhr, textStatus, errorThrown) {
    setTimeout(function() {
      notificaciones.consultar();
    }, 15000);
  });
}

notificaciones.notificar = function(data) {
  var total = notificaciones.encuestasNuevas + notificaciones.publicacionesNuevas;

  $('#notificaciones').addClass('badge badge-encuestas');
  $('#notificaciones').html(total);

  if (notificaciones.encuestasNuevas) {
    $('#notificacion-encuesta').addClass('badge');
    $('#notificacion-encuesta').html(notificaciones.encuestasNuevas);
  }

  if (notificaciones.publicacionesNuevas) {
    $('#notificacion-publicacion').addClass('badge');
    $('#notificacion-publicacion').html(notificaciones.publicacionesNuevas);
  }
}

notificaciones.actualizarEncuestaLocal = function() {
  notificaciones.encuestasNuevas = notificaciones.encuestasNuevas -1;
  notificaciones.actualizarUI();
}

notificaciones.actualizarPropuestaLocal = function() {
  notificaciones.publicacionesNuevas = notificaciones.publicacionesNuevas -1;
  notificaciones.actualizarUI();
}

notificaciones.actualizarUI = function() {
  var total = notificaciones.encuestasNuevas + notificaciones.publicacionesNuevas;

  if (total == 0) {
    $('#notificaciones').removeClass('badge badge-encuestas');
    $('#notificaciones').html('');
  } else {
    $('#notificaciones').html(total);
  }

  if (notificaciones.encuestasNuevas) {
    $('#notificacion-encuesta').html(notificaciones.encuestasNuevas);
  }

  if (notificaciones.publicacionesNuevas) {
    $('#notificacion-publicacion').html(notificaciones.publicacionesNuevas);
  }
}
