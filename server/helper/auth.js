const bcrypt = require("bcrypt");

//passoword Hashing
const hashedPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

//compare password
const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

module.exports = {
  hashedPassword,
  comparePassword,
};
