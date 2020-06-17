const {Router} = require('express');
const proyectoController = require('../controllers/proyecto.controller');
const { verificarToken } = require('../middlewares/autenticacion');
const router = Router();

router.get('/', verificarToken, proyectoController.getByCreador);
router.post('/', verificarToken, proyectoController.create);
router.put('/:id', verificarToken, proyectoController.update);
router.delete('/:id', verificarToken, proyectoController.remove);

module.exports = router;