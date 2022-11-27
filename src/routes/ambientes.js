const express = require('express');
const AmbienteController = require('../controllers/AmbienteController');
const UserController = require('../controllers/AmbienteController');
const router = express.Router();

router.get('/ambientes/index', AmbienteController.index);
router.get('/ambientes/indexusr', AmbienteController.indexUsr)
router.get('/ambientes/regisamb', AmbienteController.registrar);
router.post('/ambientes/regisamb', AmbienteController.store);
router.post('/ambientes/delete', AmbienteController.destroy);
router.get('/ambientes/edit/:idAmbiente', AmbienteController.edit);
router.post('/ambientes/edit/:idAmbiente', AmbienteController.update);


module.exports = router;