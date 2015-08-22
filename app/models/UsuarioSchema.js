var mongoose = require('mongoose');
var crypto = require('crypto');

var UsuarioSchema = new mongoose.Schema({
  id_usuario: {type: String, required: '{PATH} es un campo requerido'},
  password: {type: String, required: '{PATH} es un campo requerido'},
  admin: Boolean,
  nombre: {type: String, required: '{PATH} es un campo requerido'},
  apellido: {type: String, required: '{PATH} es un campo requerido'}
});

UsuarioSchema.methods.hashPassword = function(password) {
  var salt = crypto.randomBytes(64).toString('base64');
  var hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('base64');

  return hash + ':' + salt;
}

UsuarioSchema.methods.checkPassword = function(password) {
  var storedPassword = this.password.split(':');
  var storedHash = storedPassword[0];
  var storedSalt = storedPassword[1];
  var hash = crypto.pbkdf2Sync(password, storedSalt, 10000, 64, 'sha256').toString('base64');

  return hash === storedHash;
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
