const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nom: {type:String, required: true},
    prenom: {type: String, required: true},
    email: { type: String, required: true, unique: true},
    motDePasse: { type: String, required: true },
    pays: String,
    ville: String,
    quartier: String,
    factures: [{type: mongoose.Schema.Types.ObjectId, ref: 'Facture'}],
    notifications: [String],

},
{ timestamps: true });

module.exports = mongoose.model('Client', clientSchema);