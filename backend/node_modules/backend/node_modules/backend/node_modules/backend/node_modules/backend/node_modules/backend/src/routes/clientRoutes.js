const express= require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

//On ajoute un middleware pour valider les données 
const validateClient = [
    body('nom').notEmpty().withMessage("Le nom est requis, veuillez entrez votre nom !"),
    body('email').isEmail().withMessage("Email Invalide !"),
    body("motDePasse").isLength({min : 6}).withMessage("Votre Mot de passe est faible : Minimum 6 caractères"),
];
//Routes pour les Clients

router.post('/', validateClient, clientController.createClient);
router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);
router.post('/login', clientController.loginClient);

module.exports = router;