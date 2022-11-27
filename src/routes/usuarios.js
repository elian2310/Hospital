const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/usuarios/index', UserController.index);
router.get('/usuarios/regisuser', UserController.registrar);
router.post('/usuarios/regisuser', UserController.store);
router.post('/usuarios/delete', UserController.destroy );
router.get('/usuarios/edit/:ciUsuario', UserController.edit);
router.post('/usuarios/edit/:ciUsuario', UserController.update);

module.exports = router;