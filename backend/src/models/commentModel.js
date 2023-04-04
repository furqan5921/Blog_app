const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  blog: { type: mongoose.Types.ObjectId, ref: 'Blog', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
