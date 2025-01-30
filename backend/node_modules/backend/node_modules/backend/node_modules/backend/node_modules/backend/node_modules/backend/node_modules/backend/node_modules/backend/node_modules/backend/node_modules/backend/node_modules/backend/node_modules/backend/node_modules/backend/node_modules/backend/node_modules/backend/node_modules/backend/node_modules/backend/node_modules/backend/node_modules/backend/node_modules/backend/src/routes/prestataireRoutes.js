const express = require('express');
const router = express.Router();
const prestataireController = require('../controllers/prestataireController');

// Routes pour les prestataires
router.post('/', prestataireController.createPrestataire); // Créer un prestataire
router.get('/', prestataireController.getAllPrestataires); // Obtenir tous les prestataires
router.get('/:id', prestataireController.getPrestataireById); // Obtenir un prestataire par ID
router.put('/:id', prestataireController.updatePrestataire); // Mettre à jour un prestataire
router.delete('/:id', prestataireController.deletePrestataire); // Supprimer un prestataire

module.exports = router;
