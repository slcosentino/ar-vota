var express = require('express');
var router = express.Router();
var passport = require('passport');

var Provincia = require('../models/ProvinciaSchema');

router.get('/', function(req, res, next) {
  Provincia.find(function(err, provincias) {
    if (!err) {
      res.json(provincias);
    } else {
      return next(err);
    }
  });
});

module.exports = router;
