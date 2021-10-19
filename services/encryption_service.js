const crypto = require('crypto');
// const atob = require('atob');

const EncryptionService = {
  genRandomString: (length) => { // generated a random string of size 16
    try {
      return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
    } catch (err) {
      return err;
    }
  },

  /**
     * Used sha512 along with salt value to hash the function
     */

  sha512: (password, salt) => {
    try {
      const hash = crypto.createHmac('sha512', salt);
      hash.update(password);
      const value = hash.digest('hex');
      return {
        salt,
        passwordHash: value,
      };
    } catch (err) {
      return err;
    }
  },
  /**
     * Encrypts the password using salt and sha512
     */
  saltHashPassword: (userpassword) => {
    try {
      const salt = EncryptionService.genRandomString(16);
      const userEncryptpassword = userpassword;
      const passwordData = EncryptionService.sha512(userEncryptpassword, salt);
      return passwordData;
    } catch (err) {
      return err;
    }
  },
  /**
     * Cross-checking of password during user sign-in
     */
  saltHashExistingUserPassword: (userpassword, salt) => {
    try {
      const passwordData = EncryptionService.sha512(userpassword, salt);
      return passwordData;
    } catch (err) {
      return err;
    }
  },
};

module.exports = EncryptionService;
