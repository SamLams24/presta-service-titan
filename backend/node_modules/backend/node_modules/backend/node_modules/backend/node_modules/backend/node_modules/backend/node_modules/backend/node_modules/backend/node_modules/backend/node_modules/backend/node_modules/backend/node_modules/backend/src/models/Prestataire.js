const mongoose = require('mongoose');

const prestataireSchema = new mongoose.Schema( {
    nomEntreprise: { type: String, required: true}, 
    nomResponsable: {type: String, required: true }, 
    email: { type: String, required: true, unique: true},
    motDePasse: { type: String, required: true }, 
    typePrestataire: { type: String, enum: ['Société', 'startup', 'particulier', 'autres'], required: true},
    localisation: { type: String, required: true },
    prestations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prestation'}],
    evaluations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation'}],
    estValide: { type: Boolean, default: false },


},
{ timestamps : true});

module.exports = mongoose.model('Prestataire', prestataireSchema);