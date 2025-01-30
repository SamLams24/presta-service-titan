const express = require('express');
const router = express.Router();
const prestationController = require('../controllers/prestationController');

// Routes pour les prestations
router.post('/', prestationController.createPrestation); // Créer une prestation
router.get('/', prestationController.getAllPrestations); // Obtenir toutes les prestations

module.exports = router;
