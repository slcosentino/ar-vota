module.exports = function(app) {
  app.use('/', require('../routes/index'));
  app.use('/api/index', require('../routes/index'));
  app.use('/api/usuarios', require('../routes/usuarios'));
  app.use('/api/admin', require('../routes/admin'));
  app.use('/api/encuestas', require('../routes/encuestas'));
  app.use('/api/propuestas', require('../routes/propuestas'));
  app.use('/api/quejas', require('../routes/quejas'));
  app.use('/api/images', require('../routes/images'));
}
