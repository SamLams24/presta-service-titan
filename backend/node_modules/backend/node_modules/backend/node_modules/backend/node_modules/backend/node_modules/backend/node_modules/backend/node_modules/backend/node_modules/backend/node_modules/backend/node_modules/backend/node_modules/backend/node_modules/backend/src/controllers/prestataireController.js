const Prestataire = require('../models/Prestataire');

// Créer un nouveau prestataire
exports.createPrestataire = async (req, res) => {
  try {
    const { nomEntreprise, nomResponsable, email, motDePasse, typePrestataire, localisation } = req.body;

    if (!nomEntreprise || !nomResponsable || !email || !motDePasse || !typePrestataire || !localisation) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    const prestataire = new Prestataire({
      nomEntreprise,
      nomResponsable,
      email,
      motDePasse, // Ajouter un hashage ici plus tard
      typePrestataire,
      localisation,
    });

    await prestataire.save();
    res.status(201).json({ message: "Prestataire créé avec succès.", prestataire });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du prestataire.", error: error.message });
  }
};

// Obtenir tous les prestataires
exports.getAllPrestataires = async (req, res) => {
  try {
    const prestataires = await Prestataire.find().populate('prestations');
    res.status(200).json(prestataires);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des prestataires.", error: error.message });
  }
};

// Obtenir un prestataire par ID
exports.getPrestataireById = async (req, res) => {
  try {
    const { id } = req.params;
    const prestataire = await Prestataire.findById(id).populate('prestations evaluations');

    if (!prestataire) {
      return res.status(404).json({ message: "Prestataire non trouvé." });
    }

    res.status(200).json(prestataire);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du prestataire.", error: error.message });
  }
};

// Mettre à jour un prestataire
exports.updatePrestataire = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const prestataire = await Prestataire.findByIdAndUpdate(id, updatedData, { new: true });

    if (!prestataire) {
      return res.status(404).json({ message: "Prestataire non trouvé." });
    }

    res.status(200).json({ message: "Prestataire mis à jour avec succès.", prestataire });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du prestataire.", error: error.message });
  }
};

// Supprimer un prestataire
exports.deletePrestataire = async (req, res) => {
  try {
    const { id } = req.params;

    const prestataire = await Prestataire.findByIdAndDelete(id);

    if (!prestataire) {
      return res.status(404).json({ message: "Prestataire non trouvé." });
    }

    res.status(200).json({ message: "Prestataire supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du prestataire.", error: error.message });
  }
};
