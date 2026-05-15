const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName:     { type: String, required: true },
  lastName:      { type: String, required: true },
  age:           { type: Number },
  gender:        { type: String },
  contactNumber: { type: String },
  email:         { type: String, required: true, unique: true },
  type:          { type: String, enum: ['admin', 'editor', 'viewer'], default: 'editor' },
  username:      { type: String, required: true, unique: true },
  password:      { type: String, required: true },
  address:       { type: String },
  isActive:      { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
