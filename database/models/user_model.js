const mongoose = require('mongoose');
const userSchema = require('../schema/user_schema');

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;