const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  slug:     { type: String, required: true, unique: true },
  content:  [{ type: String }],
  image:    { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
