const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`;
    pool.query(query, [username, email, hashedPassword], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

module.exports = { createUser };
