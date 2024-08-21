const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    pool.query(query, [email], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return resolve(null);
      }
      resolve(results[0]);
    });
  });
};

const comparePassword = (enteredPassword, storedPasswordHash) => {
  return bcrypt.compare(enteredPassword, storedPasswordHash);
};

module.exports = { findUserByEmail, comparePassword };
