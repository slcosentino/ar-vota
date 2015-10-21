module.exports = {
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({message:'Debe realizar log in para acceder al recurso'});
  },
  isLoggedInAdmin: function (req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.admin) {
        return next();
      }
      res.status(401).json({message:'Debe ser admin para acceder al recurso'});
    }
    res.status(401).json({message:'Debe realizar log in para acceder al recurso'});
  },
  isCiudadano: function (req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.esCiudadano) { 
        return next();
      }
      res.status(401).json({message:'Debe ser ciudadano'});
    }
    res.status(401).json({message:'Debe realizar log in para acceder al recurso'});
  },
  isCandidato: function (req, res, next) {
    if (req.isAuthenticated()) {
      if (!req.user.esCiudadano) {
        return next();
      }
      res.status(401).json({message:'Debe ser candidato'});
    }
    res.status(401).json({message:'Debe realizar log in para acceder al recurso'});
  }
}
