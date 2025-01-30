const Facture = require("../models/Facture");
const { sendNotification } = require("../services/notificationService");

// Créer une nouvelle facture
exports.createFacture = async (req, res) => {
  try {
    const { clientId, prestataireId, prestationId, montant, modePaiement } =
      req.body;

    if (!["wallet", "espèce"].includes(modePaiement)) {
      return res.status(400).json({ message: "Mode de paiement invalide" });
    }
    const facture = new Facture({ clientId, prestataireId, prestationId, montant, modePaiement });

    await facture.save();
    // Envoie de notification au prestataire
    sendNotification(prestataireId, "Une nouvelle facture a été générée pour vous.")
    res.status(201).json({ message: "Facture créée avec succès.", facture });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la création de la facture.",
        error: error.message
      });
  }
};

// Obtenir toutes les factures
exports.getAllFactures = async (req, res) => {
  try {
    const factures = await Facture.find().populate(
      "client prestataire prestation"
    );
    res.status(200).json(factures);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des factures.",
        error: error.message
      });
  }
};
