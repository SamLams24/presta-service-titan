const Prestation = require('../models/Prestation');

// Créer une nouvelle prestation
exports.createPrestation = async (req, res) => {
  try {
    const { nom, description, prix, localisation, prestataireId } = req.body;

    if (!nom || !description || !prix || !localisation || !prestataireId) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    const prestation = new Prestation({
      nom,
      description,
      prix,
      localisation,
      prestataire: prestataireId,
    });

    await prestation.save();
    res.status(201).json({ message: "Prestation créée avec succès.", prestation });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la prestation.", error: error.message });
  }
};

// Obtenir toutes les prestations
exports.getAllPrestations = async (req, res) => {
  try {
    const prestations = await Prestation.find().populate('prestataire');
    res.status(200).json(prestations);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des prestations.", error: error.message });
  }
};
