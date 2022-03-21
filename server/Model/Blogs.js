const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
  User: { type: String },
  Title: { type: String },
  Picture: { type: String },
  Description: { type: String }
}, { collection: 'blogs' })

const BlogModel = mongoose.model('Blogs', BlogSchema);

module.exports = BlogModel;