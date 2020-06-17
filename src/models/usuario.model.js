const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El email es necesario'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es necesaria'],
    trim: true
  },
  registro: {
    type: Date,
    default: Date.now()
  },
  estado: {
    type: Boolean,
    default: true
  }
});

usuarioSchema.methods.toJSON = function(){
  let user = this;
  let userObject = user.toObject();
  delete userObject.password ;
  return userObject;
}

usuarioSchema.path('password').set((val) => bcrypt.hashSync(val, 10));
usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} debe ser unico'})

let Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;