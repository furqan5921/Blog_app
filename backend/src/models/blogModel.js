const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: mongoose.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],

},{
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);
