// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const users = await tables.users.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const user = await tables.users.read(req.params.id);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const { id } = req.params;
  const { firstname } = req.body.firstname;
  const { lastname } = req.body.lastname;
  const { codePostal } = req.body.code_postal;
  const { ville } = req.body.ville;
  const { email } = req.body.email;
  const { password } = req.body.password;
  const { loggedIn } = req.body.logged_in;
  const { nbVehicule } = req.body.nb_vehicule;
  const { isAdmin } = req.body.isAdmin;

  try {
    const user = await tables.users.update(
      id,
      firstname,
      lastname,
      codePostal,
      ville,
      email,
      password,
      loggedIn,
      nbVehicule,
      isAdmin
    );
    if (user.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const user = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.users.create(user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.info(`Nouvelle requête depuis : ${ip}`);
  try {
    const user = await tables.users.signIn(email);
    if (user.length === 1) {
      next();
    } else {
      // Authentification failed
      res
        .status(401)
        .send({ message: "Aucun compte n'a été trouver avec cette email" });
    }
    if (user[0].password === password) {
      next();
    } else {
      // Authentification failed
      res.status(401).send({ message: "Mot de passe incorrect" });
    }
  } catch (err) {
    res.status(501).send(err);
  }
};
// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  login,
  // destroy,
};
