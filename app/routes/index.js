var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/admin', function(req, res, next) {
  res.render('admin', {usuario: req.user});
});

module.exports = router;
