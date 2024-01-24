const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  profilePic: String,
  password: { type: String},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerification: { type: Boolean, default: false },
  userType: { type: Number, enum: [0, 1, 2], default: 0 }, // 0-user, 1-artist, 2-admin
  active: { type: Boolean, default: true }, // Account status (active/inactive)
  dateCreated: { type: Date, default: Date.now },
  otp:{type: Number},
  otp_timestamp:{type: Date},
  artist_type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ArtistType' }],
  artist_services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ArtistService' }]
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;