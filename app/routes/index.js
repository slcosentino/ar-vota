var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index',{usuario: req.user});
});

router.get('/admin', function(req, res, next) {
  res.render('admin', {usuario: req.user});
});

module.exports = router;
