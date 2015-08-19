module.exports = {
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({message:'Debe realizar log in para acceder al recurso'});
  }
}
