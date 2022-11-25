const express = require('express');
const PersonalController = require('../controllers/PersonalController');
const router = express.Router();

router.get('/personal', PersonalController.index);
router.get('/registrarPersonal', PersonalController.registrar);
router.post('/registrarPersonal', PersonalController.store);
router.post('/personal/delete', PersonalController.destroy);
router.get('/personal/edit/:ciPersonal', PersonalController.edit);
router.post('/personal/edit/:ciPersonal', PersonalController.update);

module.exports = router;