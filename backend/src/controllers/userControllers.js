const jwt = require("jsonwebtoken");
const argon2 = require("@node-rs/argon2");
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
    const { token } = req.cookies;
    const user = await tables.user.read(token);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const takeId = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await tables.user.takeId(email);

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
  const { token } = req.cookies;
  const { prenom, nom, anniversaire, rue, codePostal, ville, derniereMaj } =
    req.body;

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
  const user = req.body;
  console.info(user);
  try {
    // Insert the item into the database
    const userExist = await tables.user.signIn(user.email);

    const ActualDate = new Date();
    const birthday = new Date(user.anniversaire);
    if (userExist.length === 0) {
      if (
        user.anniversaire < user.derniere_maj &&
        Math.floor((Date.now() - birthday) / 31557600000) >= 18
      ) {
        const insertId = await tables.user.create(user);
        const tokenUser = jwt.sign(
          { email: user.email, userId: insertId },
          process.env.APP_SECRET,
          { expiresIn: "1h" }
        );

        if (user.admin === 1) {
          res.cookie("token", tokenUser, {
            httpOnly: true,
            maxAge: 3600000,
          });
          res.status(200).send({
            message: "Authentification réussie",
            admin: true,
            insertId,
          });

          await tables.user.saveToken(tokenUser, user.email);
          await tables.user.setLastConnexion(ActualDate, user.email);
        } else {
          res.cookie("token", tokenUser, {
            httpOnly: true,
            maxAge: 3600000,
          });
          res.status(200).send({
            message: "Authentification réussie",
            admin: false,
            insertId,
          });

          await tables.user.saveToken(tokenUser, user.email);
          await tables.user.setLastConnexion(ActualDate, user.email);
        }
      } else {
        res.status(200).send({
          message: "Vous devez avoir plus de 18 ans",
        });
      }
    } else {
      res.status(200).send({
        message: "Cet email est déjà prit",
      });
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await tables.user.signIn(email);
    const ActualDate = new Date();
    if (user.length === 1) {
      const verified = await argon2.verify(user[0].password, password);

      if (verified) {
        // Respond with the user and a signed token in JSON format (but without the hashed password)
        delete user.password;

        const tokenUser = jwt.sign(
          { email: user[0].email, userId: user[0].id },
          process.env.APP_SECRET,
          { expiresIn: "1h" }
        );

        if (user[0].admin === 1) {
          res.cookie("token", tokenUser, {
            httpOnly: true,
            maxAge: 3600000,
          });
          res.status(200).send({
            message: "Authentification réussie",
            admin: true,
          });

          await tables.user.saveToken(tokenUser, email);
          await tables.user.setLastConnexion(ActualDate, email);
        } else {
          res.cookie("token", tokenUser, {
            httpOnly: true,
            maxAge: 3600000,
          });
          res.status(200).send({
            message: "Authentification réussie",
            admin: false,
          });

          await tables.user.saveToken(tokenUser, email);
          await tables.user.setLastConnexion(ActualDate, email);
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
  if (!req.cookies.token) {
    res.status(204).send({ message: "Not Conencted" });
  } else {
    const { token } = req.cookies;

    try {
      const decodedToken = jwt.verify(token, process.env.APP_SECRET);

      const { userId } = decodedToken;

      const checkUserToken = await tables.user.checkToken(token);

      if (
        checkUserToken.length === 1 &&
        checkUserToken[0].token === token &&
        checkUserToken[0].id === userId &&
        checkUserToken[0].admin === 1
      ) {
        res.status(200).send({
          message: "OK",
          admin: true,
          id: userId,
        });
      } else if (
        checkUserToken.length === 1 &&
        checkUserToken[0].token === token &&
        checkUserToken[0].id === userId &&
        checkUserToken[0].admin === 0
      ) {
        res.status(200).send({
          message: "OK",
          admin: false,
          id: userId,
        });
      } else res.status(200).send({ message: "Error" });
    } catch (err) {
      res.status(200).send({ message: err });
      next(err);
    }
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ message: "OK" });
  } catch (err) {
    next(err);
  }
};
// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

const userDelete = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { email, password } = req.body;
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
    const { token } = req.cookies;
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
  takeId,
  logout,
};
