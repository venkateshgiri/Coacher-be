const mongoose = require('mongoose');
const EncryptionService = require('../../services/encryption_service')
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  password: { type: String, required: true},
  salt: { type: String }
}, { timestamps: true })

userSchema.pre('save', function pre(next) {
  const user = this;
  const saltAndHash = EncryptionService.saltHashPassword(user.password);
  user.password = saltAndHash.passwordHash;
  user.salt = saltAndHash.salt;
  next();
});

// indexes

userSchema.index({ email: 1 });

module.exports = userSchema;