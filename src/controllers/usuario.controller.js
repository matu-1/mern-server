const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { pick } = require("../utils/utils");
const Usuario = require("../models/usuario.model");

let getAll = (req, res) => {
  res.json({ok: true});
};

let getById = (req, res) => {
  res.json({ok: true});
}

let create = async (req, res) => {
  const errores = validationResult(req);   /// revisar si hay errores
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

  let body = pick(req.body, ['nombre', 'email', 'password']);
  let usuario = new Usuario(body);
  usuario.save()
    .then(usuario => {
      let token = jwt.sign({ usuario }, process.env.SECRET, {expiresIn: '24h'})
      res.json({ok: true, usuario, token })
    }).catch( err => {
      res.status(500).json({ ok: false, err })
    });
};

let update = (req, res) => {
  res.json({ok: true});
};

let destroy = (req, res) => {
  res.json({ok: true});
};

module.exports = {
  getAll, create
}