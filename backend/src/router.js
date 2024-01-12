const express = require("express");
const multer = require("multer");
const { hashPassword } = require("./services/auth");

const upload = multer({ dest: "public/uploads/" });
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
const tarificationControllers = require("./controllers/tarificationControllers");
const borneControllers = require("./controllers/borneControllers");

// Route to connect user
router.post("/login", userControllers.login);

// Route to delete user
router.post("/delete", userControllers.userDelete);

// Route to verify token
router.get("/checktoken", userControllers.checktoken);

// Route to verify token
router.get("/takedata", userControllers.takeData);
router.get("/logout", userControllers.logout);

// Route to get a list of users
router.get("/users", userControllers.browse);

// Route to get a list of reservations by ID
router.get("/users/:id", userControllers.read);

// Route to add a new users
router.post("/users", hashPassword, userControllers.add);

// Route to edit a user
router.post("/edituser", userControllers.edit);

// Route to get a list of reservations
router.post("/reservations", reservationControllers.browse);

router.get("/reservations", reservationControllers.readAll);

router.post("/borneinfo", borneControllers.read);

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

// Route to get a list of tarifications
router.get("/tarifications", tarificationControllers.browse);

// Route to get a specific tarifications by ID
router.get("/tarifications/:id", tarificationControllers.read);

// Route to add a new tarifications
router.post("/tarifications", tarificationControllers.add);

// Route to get a list of bornes
router.get("/bornes", borneControllers.browse);

router.post("/deletereservation", reservationControllers.destroyReservation);

// Route pour ajouter le fichier csv
router.post("/uploads", upload.single("file"), borneControllers.add);

/* ************************************************************************* */

module.exports = router;
