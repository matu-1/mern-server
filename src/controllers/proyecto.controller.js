const { pick } = require("../utils/utils");
const Proyecto = require("../models/proyecto.model");


let getByCreador = (req, res) => {
  const { _id } = req.usuario;
  Proyecto.find({creador: _id, estado: true}).sort({ _id: -1})
    .then(proyectos => {
      res.json({ ok: true, proyectos });
    }).catch( err => {
      res.status(500).json({ ok: false, err })
    });
}


let create = (req, res) => {
  let body = pick(req.body, ['nombre']);
  body.creador = req.usuario._id;
  let proyecto = new Proyecto(body);
  proyecto.save()
    .then(proyecto => {
      res.json({ok: true, proyecto })
    }).catch( err => {
      res.status(500).json({ ok: false, err })
    });
}

let update = (req, res) => {
  let id = req.params.id;
  let body = pick(req.body, ['nombre']);
  Proyecto.findByIdAndUpdate(id, body, { new: true })
    .then(proyecto => {
      if(!proyecto)
        return res.status(400).json({ok: false, err: { message: 'El proyecto no existe'}})
      res.json({ok: true, proyecto })
    }).catch( err => {
      res.status(500).json({ ok: false, err })
    });
}

let remove = (req, res) => {
  let id = req.params.id;
  Proyecto.findByIdAndUpdate(id, { estado: false }, { new: true })
    .then(proyecto => {
      if(!proyecto)
        return res.status(400).json({ok: false, err: { message: 'El proyecto no existe'}})
      res.json({ok: true, proyecto })
    }).catch( err => {
      res.status(500).json({ ok: false, err })
    });
}

module.exports = {
  create, getByCreador, update, remove
}