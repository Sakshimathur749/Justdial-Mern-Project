const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobilenumber: { type: String },
  membership: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership'},
  role: { type: String, enum: ['admin', 'vendor'] },
});

const User = mongoose.model('User', userSchema);

module.exports = User;