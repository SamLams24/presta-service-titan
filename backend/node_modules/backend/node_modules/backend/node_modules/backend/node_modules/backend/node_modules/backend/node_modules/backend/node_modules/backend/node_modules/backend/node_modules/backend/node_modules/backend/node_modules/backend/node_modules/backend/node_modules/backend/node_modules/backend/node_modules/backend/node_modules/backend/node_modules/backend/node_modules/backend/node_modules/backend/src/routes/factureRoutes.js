const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController');

// Routes pour les factures
router.post('/', factureController.createFacture); // Créer une facture
router.get('/', factureController.getAllFactures); // Obtenir toutes les factures

module.exports = router;
