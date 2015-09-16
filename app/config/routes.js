module.exports = function(app) {
  app.use('/', require('../routes/index'));
  app.use('/api/usuarios', require('../routes/usuarios'));
  app.use('/api/admin', require('../routes/admin'));
  app.use('/api/admin/encuestas', require('../routes/encuestas'));
  app.use('/api/usuarios/propuestas', require('../routes/propuestas'));
}
