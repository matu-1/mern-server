const {Router} = require('express');
const { check } = require('express-validator');
const usuarioController = require('../controllers/usuario.controller');
const router = Router();

router.get('/', usuarioController.getAll);
router.post('/', 
[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'Debe ser un email valido').isEmail(),
  check('password', 'El password debe ser minimo de 6 caractares').isLength({min: 6}),
],
usuarioController.create);

module.exports = router;