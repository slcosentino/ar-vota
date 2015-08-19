module.exports = function(app) {
  app.use('/', require('../routes/index'));
  app.use('/api/usuarios', require('../routes/usuarios'));
}
