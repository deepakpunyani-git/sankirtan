const mongoose = require('mongoose');

const ArtistServicesSchema = new mongoose.Schema({
  service: { type: String, required: true },
  active: { type: Boolean, default: true }, // Account status (active/inactive)
  dateCreated: { type: Date, default: Date.now }
});

const ArtistServices = mongoose.model('ArtistService', ArtistServicesSchema);

module.exports = ArtistServices;