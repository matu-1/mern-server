const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario'],
    trim: true,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now()
  },
  estado: {
    type: Boolean,
    default: false
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto',
    required: [true, 'El proyectoId es necesario'],
  }
});

let Tarea = mongoose.model('Tarea', tareaSchema);
module.exports = Tarea;