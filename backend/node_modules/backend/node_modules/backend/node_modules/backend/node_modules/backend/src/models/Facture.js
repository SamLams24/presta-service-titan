const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true},
    prestataire: {type: mongoose.Schema.Types.ObjectId, ref: 'Prestataire', required: true},
    prestation: {type: mongoose.Schema.Types.ObjectId, ref: 'Prestation', required: true},
    montant: { type: Number, required: true},
    dateCreation: { type: Date, default: Date.now },
    modePaiement: {type: String, enum: ['wallet', 'espèce'], required: true},

}, 
{ timestamps: true});

module.exports = mongoose.model('Facture', factureSchema);