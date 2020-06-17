let jwt = require('jsonwebtoken');


let verificarToken = (req, res, next) => {
  let token = req.header('token');
  try {
    let decoded = jwt.verify(token, process.env.SECRET);
    req.usuario = decoded.usuario;
    next();
  } catch(err) {
    res.status(401).json({
      ok: false, 
      err: { mensaje: 'Token no valido' }
    })
  }
}

module.exports = {
  verificarToken
}