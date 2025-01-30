const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  prestataire: { type: mongoose.Schema.Types.ObjectId, ref: 'Prestataire', required: true },
  commentaire: { type: String, required: true },
  note: { type: Number, min: 1, max: 5, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);
