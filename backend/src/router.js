const express = require("express");
const database = require("../database/client");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const reservationControllers = require("./controllers/reservationControllers");
const marqueControllers = require("./controllers/marqueControllers");
const modeleControllers = require("./controllers/modeleControllers");
const vehiculeControllers = require("./controllers/vehiculeControllers");
const enseigneControllers = require("./controllers/enseigneControllers");
const accessibiliteControllers = require("./controllers/accessibiliteControllers");
const tarificationControllers = require("./controllers/tarificationControllers");
const borneControllers = require("./controllers/borneControllers");

// Route to get a list of users
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.info(`Nouvelle requête depuis : ${ip}`);

  // Ici, vérifier les identifiants contre base de données ou service d'authentification
  // Authentification réussie
  const [user] = await database.query(
    `SELECT * FROM users WHERE email = ? AND password = ?`,
    [email, password]
  );

  if (user.length === 1) {
    res.status(200).send(ip);
  } else {
    // Authentification échouée
    res
      .status(401)
      .send({ message: "Nom d'utilisateur ou mot de passe incorrect." });
  }
});

// Route to get a list of users
router.get("/users", userControllers.browse);

// Route to get a list of reservations by ID
router.get("/users/:id", userControllers.read);

// Route to add a new users
router.post("/users", userControllers.add);

// Route to edit a user
router.post("/users/:id", userControllers.edit);

// Route to get a list of reservations
router.get("/reservations", reservationControllers.browse);

// Route to get a specific users by ID
router.get("/reservations/:id", reservationControllers.read);

// Route to add a new reservations
router.post("/reservations", reservationControllers.add);

// Route to get a list of marque
router.get("/marques", marqueControllers.browse);

// Route to get a specific users by ID
router.get("/marques/:id", marqueControllers.read);

// Route to add a new reservations
router.post("/marques", marqueControllers.add);

// Route to get a list of modeles
router.get("/modeles", modeleControllers.browse);

// Route to get a specific users by ID
router.get("/modeles/:id", modeleControllers.read);

// Route to add a new reservations
router.post("/modeles", modeleControllers.add);

// Route to get a list of vehicules
router.get("/vehicules", vehiculeControllers.browse);

// Route to get a specific users by ID
router.get("/vehicules/:id", vehiculeControllers.read);

// Route to add a new reservations
router.post("/vehicules", vehiculeControllers.add);

// Route to get a list of enseignes
router.get("/enseignes", enseigneControllers.browse);

// Route to get a specific enseignes by ID
router.get("/enseignes/:id", enseigneControllers.read);

// Route to add a new enseignes
router.post("/enseignes", enseigneControllers.add);

// Route to get a list of accessibilites
router.get("/accessibilites", accessibiliteControllers.browse);

// Route to get a specific accessibilites by ID
router.get("/accessibilites/:id", accessibiliteControllers.read);

// Route to add a new accessibilites
router.post("/accessibilites", accessibiliteControllers.add);

// Route to get a list of tarifications
router.get("/tarifications", tarificationControllers.browse);

// Route to get a specific tarifications by ID
router.get("/tarifications/:id", tarificationControllers.read);

// Route to add a new tarifications
router.post("/tarifications", tarificationControllers.add);

// Route to get a list of bornes
router.get("/bornes", borneControllers.browse);

// Route to get a specific bornes by ID
router.get("/bornes/:id", borneControllers.read);

// Route to add a new bornes
router.post("/bornes", borneControllers.add);

/* ************************************************************************* */

module.exports = router;
