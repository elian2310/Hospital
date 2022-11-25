const express = require('express');
const SucesosController = require('../controllers/SucesoController');
const router = express.Router();

router.get('/sucesos', SucesosController.index);
router.get('/registrar', SucesosController.registrar);
router.post('/registrar', SucesosController.store);

router.post('/sucesos/delete', SucesosController.destroy)
router.get('/sucesos/edit/:idSuceso', SucesosController.edit)

router.post('/sucesos/edit/:idSuceso', SucesosController.update);

module.exports = router;