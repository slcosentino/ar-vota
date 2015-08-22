module.exports = {
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({message:'Debe realizar log in para acceder al recurso'});
  },
  isLoggedInAdmin: function (req, res, next) {
    if (req.isAuthenticated && req.user.admin) {
      return next();
    }
    res.status(401).json({message:'Debe ser admin para acceder al recurso'});
  }
}
