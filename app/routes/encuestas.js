var express = require('express');
var router = express.Router();
var passport = require('passport');

var authentication = require('../middlewares/authentication');

router.get('/', authentication.isLoggedInAdmin, function(req, res, next) {
  Encuesta.find(function(err, encuestas){
    if (!err) {
      res.json(encuestas);
    } else {
      return next(err);
    }
  });
});

module.exports = router;
