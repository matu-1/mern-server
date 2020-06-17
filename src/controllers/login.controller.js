const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuario.model");

let login = (req, res) => {
  const {email, password} = req.body;

  // revisar si el usuario existe
  Usuario.findOne({email})
    .then(usuario => {
      if(!usuario) 
        return res.status(400).json({ok: false, err: {mensaje: 'No existe el email'}});

      if(!bcrypt.compareSync(password, usuario.password))
        return res.status(400).json({ok: false, err: {mensaje: 'La contraseña es incorrecta'}});

      let token = jwt.sign({ usuario }, process.env.SECRET, {expiresIn: '24h'})
      res.json({ok: true, usuario, token});

    }).catch( err => {
      res.status(500).json({ ok: false, err })
    });
}

module.exports = {
  login,
}