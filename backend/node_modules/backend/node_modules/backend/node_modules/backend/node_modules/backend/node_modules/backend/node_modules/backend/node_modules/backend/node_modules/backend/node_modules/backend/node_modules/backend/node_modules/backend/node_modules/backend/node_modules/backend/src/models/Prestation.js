const mongoose = require('mongoose'); 
const Prestataire = require('./Prestataire');

const prestationSchema = new mongoose.Schema( {
    nom: {type: String, required: true},
    description: { type: String, required: true},
    prix: { type: Number, required: true},
    localisation: { type: String, required: true},
    images: [String],
    estDisponible: {type: Boolean, default:true }, 
    prestataire: { type: mongoose.Schema.Types.ObjectId, ref: 'Prestataire', required: true },

}, {timestamps: true});

module.exports = mongoose.model('Prestation', prestationSchema);