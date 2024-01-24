const mongoose = require('mongoose');

const ArtistTypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  active: { type: Boolean, default: true }, // Account status (active/inactive)
  dateCreated: { type: Date, default: Date.now }
});

const ArtistTypeModel = mongoose.model('ArtistType', ArtistTypeSchema);

module.exports = ArtistTypeModel;