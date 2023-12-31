const jwt = require("jsonwebtoken");
// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);

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
  const {
    token,
    prenom,
    nom,
    anniversaire,
    rue,
    codePostal,
    ville,
    derniereMaj,
  } = req.body;

  try {
    const birthday = new Date(anniversaire);
    if (codePostal.toString().length === 5) {
      if (
        anniversaire < derniereMaj &&
        Math.floor((Date.now() - birthday) / 31557600000) >= 18
      ) {
        const user = await tables.user.update(
          token,
          prenom,
          nom,
          anniversaire,
          rue,
          codePostal,
          ville,
          derniereMaj
        );

        if (user.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.status(202).send({ message: "user updated" });
        }
      } else {
        res.status(202).send({ message: "Date d'anniversaire incorrect" });
      }
    } else {
      res.status(202).send({ message: "Code Postal incorrect" });
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
    const insertId = await tables.user.create(user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.info(`Nouvelle requête depuis : ${ip}`);
    const user = await tables.user.signIn(email);
    if (user.length === 1) {
      if (user[0].password === password) {
        const tokenUser = jwt.sign(
          { email: user[0].email, userId: user[0].id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        if (user[0].admin === 1) {
          res.status(200).send({
            message: "Authentification réussie",
            token: tokenUser,
            admin: true,
          });
          await tables.user.saveToken(tokenUser, email);
        } else {
          res.status(200).send({
            message: "Authentification réussie",
            token: tokenUser,
            admin: false,
          });
          await tables.user.saveToken(tokenUser, email);
        }
      } else {
        res.status(401).send({ message: "Mot de passe incorrect" });
      }
    } else {
      res
        .status(401)
        .send({ message: "Aucun compte n'a été trouvé avec cet email" });
    }
  } catch (err) {
    next(err);
  }
};

const checktoken = async (req, res, next) => {
  const { token } = req.body;
  console.info("checkencours");

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const { userId } = decodedToken;
    const checkUserToken = await tables.user.checkToken(token);
    console.info(checkUserToken);
    if (
      checkUserToken.length === 1 &&
      checkUserToken[0].token === token &&
      checkUserToken[0].id === userId &&
      checkUserToken[0].admin === 1
    ) {
      res.status(200).send({ message: "OK", admin: true });
      console.info(checkUserToken[0].admin, "admin");
    } else if (
      checkUserToken.length === 1 &&
      checkUserToken[0].token === token &&
      checkUserToken[0].id === userId &&
      checkUserToken[0].admin === 0
    ) {
      res.status(200).send({ message: "OK", admin: false });
      console.info(checkUserToken[0].admin, "Not an admin");
    } else res.status(200).send({ message: "ErrorElse" });
  } catch (err) {
    res.status(200).send({ message: "ErrorCatch" });
    next(err);
  }
};
// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

const userDelete = async (req, res, next) => {
  try {
    const { email, password, token } = req.body;
    const user = await tables.user.signIn(email);

    if (user.length === 1) {
      if (user[0].password === password) {
        if (user[0].token === token) {
          const vehicules = await tables.vehicule.checkVehicule(user[0].id);
          vehicules.forEach(async (vehicule) => {
            const reservation =
              await tables.reservation.checkReservationForDelete(vehicule.id);
            if (reservation.length === 0) {
              await tables.user.userDelete(user[0].id);
              res.status(200).send({ message: "Compte supprimé" });
            } else {
              res.status(200).send({
                message:
                  "Impossible de supprimer vous avez des réservations en cours veuillez les annuler si vous souhaitez supprimer votre compte de notre site de type internet merci de votre compréhension",
              });
            }
          });
        } else {
          res.status(200).send({ message: "Token incorrect" });
        }
      } else {
        res.status(200).send({ message: "Password incorrect" });
      }
    } else {
      res.status(200).send({ message: "Email incorrect" });
    }
  } catch (err) {
    next(err);
  }
};

const takeData = async (req, res, next) => {
  try {
    const { token } = req.body;
    const userData = await tables.user.takeData(token);
    if (userData.length === 1) {
      res.status(200).send(userData);
    } else {
      res.status(200).send({ message: "No User" });
    }
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  login,
  checktoken,
  userDelete,
  takeData,
};
