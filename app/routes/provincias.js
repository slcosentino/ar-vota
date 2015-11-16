var express = require('express');
var router = express.Router();
var passport = require('passport');

var Provincia = require('../models/ProvinciaSchema');

router.get('/', function(req, res, next) {
  Provincia.find(function(err, provincias) {
    if (!err) {
      if (provincias) {
        res.json(provincias);
      } else {
        return res.status(500).json({message:'No hay provincias'});
      }
    } else {
      return res.status(500).json({message:'Intente de nuevo'});
    }
  });
});

module.exports = router;
