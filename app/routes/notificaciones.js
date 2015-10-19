var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');
var Usuario = require('../models/UsuarioSchema');
var Notificator = require('../modules/Notificator');


router.get('/', authentication.isLoggedIn, function(req, res, next) {
  var timeObject = {
    times: 0,
    max: 2 
  }

  Notificator.start(req, res, next, timeObject);
});


module.exports = router;
