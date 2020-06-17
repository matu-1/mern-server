const {Router} = require('express');
const tareaController = require('../controllers/tarea.controller');
const { verificarToken } = require('../middlewares/autenticacion');
const router = Router();

router.get('/:proyecto', verificarToken, tareaController.getByProyecto);
router.post('/', verificarToken, tareaController.create);
router.put('/:id', verificarToken, tareaController.update);
router.delete('/:id', verificarToken, tareaController.remove);

module.exports = router;