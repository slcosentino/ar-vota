var mongoose = require('mongoose');
var crypto = require('crypto');

var UsuarioSchema = new mongoose.Schema({
  Id_Usuario: {type: String, required: '{PATH} es un campo requerido'},
  Password: {type: String, required: '{PATH} es un campo requerido'}
});

UsuarioSchema.methods.hashPassword = function(password) {
  var salt = crypto.randomBytes(64).toString('base64');
  var hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('base64');

  return hash + ':' + salt;
}

UsuarioSchema.methods.checkPassword = function(password) {
  var storedPassword = this.Password.split(':');
  var storedHash = storedPassword[0];
  var storedSalt = storedPassword[1];
  var hash = crypto.pbkdf2Sync(password, storedSalt, 10000, 64, 'sha256').toString('base64');

  return hash === storedHash;
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
