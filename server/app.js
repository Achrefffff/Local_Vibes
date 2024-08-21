const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importer le package cors

const app = express();

const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");

// Configurer CORS pour accepter les requêtes provenant de tous les domaines
app.use(cors());

// Middleware pour parser les données JSON
app.use(bodyParser.json());

app.use("/api", registerRoute);
app.use("/api", loginRoute);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
