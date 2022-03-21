const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  SignType: { type: String, required: true },
  Name: { type: String, required: true },
  Picture: { type: String },
  Email: { type: String, required: true },
  Password: { type: String },
  Description: { type: String },
  Blogs: { type: Number },
  GoogleAccountID: { type: String }
}, { collection: 'users' })

const userModel = mongoose.model('UserSchema', userSchema);

module.exports = userModel;