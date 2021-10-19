const UserModel = require('../database/models/user_model');
const EncryptionService = require('../services/encryption_service');

const checkPassword = async (password, userRecord) => {
    try {
      const hashedPassword = await EncryptionService
        .saltHashExistingUserPassword(password, userRecord.salt);
      if (hashedPassword.passwordHash === userRecord.password) {
        return userRecord;
      }
      throw new Error('Password mismatch');
    } catch (err) {
      throw err;
    }
  };

const isUser = async (email, password) => {
    const userRecord = await UserModel.findOne({ email }).lean();
    if (userRecord) {
      const user = await checkPassword(password, userRecord);
      return user;
    }
    throw new Error('User not found');
  };
const loginUser = async (email, password) => {
  try {
    const user = await isUser(email, password);
    return user;
  } catch (err) {
    throw err;
  }
};

const findUserById = async (id) => {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (err) {
      throw err;
    }
};

const createUser = async (userRecord) => {
  try {
   const newUser = new UserModel(userRecord);
   const user = await newUser.save();
   return user;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  loginUser,
  findUserById,
  createUser
}