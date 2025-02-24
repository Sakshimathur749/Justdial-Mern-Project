const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  username: { type: String, required: false },
  mobileNumber: { type: String, required: false },
  profilepicture: { type: String, required: false },
  Googleprofilepicture: String,
  slug: { type: String, unique: true, default: function() { return new mongoose.Types.ObjectId().toString(); }},
  bio:String,
  city:String,
  role: { type: String, default: 'vendor' },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')|| !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
// userSchema.methods.matchPassword = async function (password) {
//   console.log("Entered Password:", password);
//   console.log("Stored Hashed Password:", this.password);
//   return await bcrypt.compare(password, this.password);
// };
const User = mongoose.model('User', userSchema);
module.exports = User;