const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario'],
    trim: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  fecha_creacion: {
    type: Date,
    default: Date.now()
  },
  estado: {
    type: Boolean,
    default: true
  }
});

let Proyecto = mongoose.model('Proyecto', proyectoSchema);
module.exports = Proyecto;