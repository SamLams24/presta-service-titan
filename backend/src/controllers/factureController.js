const Facture = require('../models/Facture');

// Créer une nouvelle facture
exports.createFacture = async (req, res) => {
  try {
    const { clientId, prestataireId, prestationId, montant, modePaiement } = req.body;

    if (!clientId || !prestataireId || !prestationId || !montant || !modePaiement) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    const facture = new Facture({
      client: clientId,
      prestataire: prestataireId,
      prestation: prestationId,
      montant,
      modePaiement,
    });

    await facture.save();
    res.status(201).json({ message: "Facture créée avec succès.", facture });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la facture.", error: error.message });
  }
};

// Obtenir toutes les factures
exports.getAllFactures = async (req, res) => {
  try {
    const factures = await Facture.find().populate('client prestataire prestation');
    res.status(200).json(factures);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des factures.", error: error.message });
  }
};
