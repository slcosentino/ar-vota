module.exports = function(app) {
  app.use('/', require('../routes/index'));
  app.use('/api/index', require('../routes/index'));
  app.use('/api/usuarios', require('../routes/usuarios'));
  app.use('/api/admin', require('../routes/admin'));
  app.use('/api/encuestas', require('../routes/encuestas'));
  app.use('/api/images', require('../routes/images'));
  app.use('/api/publicaciones', require('../routes/publicaciones'));
  app.use('/api/notificaciones', require('../routes/notificaciones'));
}
