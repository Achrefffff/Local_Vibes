require("dotenv").config();
const mysql = require("mysql");

// Créer une connexion à MySQL (sans spécifier de base de données)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Fonction pour créer la base de données si elle n'existe pas
const createDatabaseIfNotExists = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        console.log(
          `Base de données ${process.env.DB_NAME} créée ou déjà existante.`
        );
        resolve(results);
      }
    );
  });
};

// Fonction pour créer les tables dans la base de données
const createTables = () => {
  return new Promise((resolve, reject) => {
    // Se reconnecter à la base de données nouvellement créée
    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) {
        return reject(err);
      }

      // Créer les tables une par une
      const queries = [
        `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS user_profiles (
            user_id INT PRIMARY KEY,
            profile_picture VARCHAR(255),
            bio TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS user_favorites (
            user_id INT,
            place_id VARCHAR(255),
            PRIMARY KEY (user_id, place_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`,
      ];

      // Exécuter les requêtes une par une
      const executeQueries = async () => {
        for (const query of queries) {
          try {
            await new Promise((resolve, reject) => {
              connection.query(query, (err, results) => {
                if (err) {
                  return reject(err);
                }
                resolve(results);
              });
            });
            console.log("Table créée ou déjà existante.");
          } catch (err) {
            console.error(
              "Erreur lors de la création de la table:",
              err.message
            );
            reject(err);
          }
        }
        resolve();
      };

      executeQueries();
    });
  });
};

// Fonction pour initialiser la base de données et créer les tables
const initializeDatabase = async () => {
  try {
    await createDatabaseIfNotExists();
    await createTables(); // Créer les tables après avoir créé la base de données
  } catch (err) {
    console.error(
      "Erreur lors de la création de la base de données ou des tables:",
      err.message
    );
  } finally {
    connection.end(); // Fermer la connexion une fois toutes les opérations terminées
  }
};

// Initialiser la base de données et créer les tables
initializeDatabase();

// Créer un pool de connexions pour utiliser avec des callbacks
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

module.exports = pool;
