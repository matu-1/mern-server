const { pick } = require("../utils/utils");
const Proyecto = require("../models/proyecto.model");
const Tarea = require("../models/tarea.model");

let getByProyecto = async (req, res ) => {
  let proyectoId = req.params.proyecto;
 
  try {
    let proyecto = await Proyecto.findById(proyectoId);
    if(!proyecto)
      return res.status(400).json({ok: false, err: {message: 'EL proyecto no existe' }}) ;
    
    //revisar si el proyecto le pertenece al usuario autenticado
    if(proyecto.creador != req.usuario._id) 
      return res.status(401).json({ok: false, err: {message: 'No autorizado, el proyecto no es tuyo' }}) ;

    let tareas = await Tarea.find({proyecto: proyectoId}).sort({_id: -1})
    res.json({ok: true, tareas });

  } catch (error) {
    res.status(500).json({ok: false, error })
  }
}

let create = async (req, res) => {
  let body = pick(req.body, ['nombre', 'proyecto']);
  try {
    let proyecto = await Proyecto.findById(body.proyecto)
    if(!proyecto)
      return res.status(400).json({ok: false, err: {message: 'EL proyecto no existe' }}) ;
    
    //revisar si el proyecto le pertenece al usuario autenticado
    if(proyecto.creador != req.usuario._id) 
      return res.status(401).json({ok: false, err: {message: 'No autorizado, el proyecto no es tuyo' }}) ;

    let tarea = new Tarea(body);
    await tarea.save();
    res.json({ok: true, tarea });

  } catch (error) {
    res.status(500).json({ok: false, error })
  }
}

let update = (req, res) => {
  let id = req.params.id;
  let body = pick(req.body, ['nombre', 'estado']);
  Tarea.findByIdAndUpdate(id, body, {new: true})
    .then(tarea => {
      if(!tarea)
        return res.status(400).json({ok: false, err: { message: 'La tarea no existe'}});
      res.json({ok: true, tarea })
    }).catch( err => {
      res.status(500).json({ ok: false, err })
    });
}

let remove = (req, res) => {
  let id = req.params.id;

  Tarea.findByIdAndRemove(id)
    .then( tarea => {
      if(!tarea)
        return res.status(400).json({ok: false, err: { message: 'La tarea no existe'}});
      res.json({ok: true, tarea })
    }).catch( err => {
      res.status(500).json({ ok: false, err })
    });
}

module.exports = {
  create, getByProyecto, update, remove
}