// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation

const browse = async (req, res, next) => {
  try {
    const data = [];
    const { token } = req.cookies;

    const user = await tables.user.checkToken(token);

    const vehicules = await tables.vehicule.checkVehicule(user[0].id);
    const vehiculeMap = vehicules.map(async (vehicule) => {
      const reservation = await tables.reservation.checkReservationForDelete(
        vehicule.id
      );
      data.push(reservation);
    });

    Promise.all(vehiculeMap).then(() => {
      res.json(data);
    });
  } catch (err) {
    next(err);
  }
};

const checkListId = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { listId } = req.body;

    const user = await tables.user.checkToken(token);
    const result = await tables.list.checkListId(listId);

    if (result.length === 0) {
      res.status(200).send({ message: "List not found" });
    } else if (user.length === 0) {
      res.status(200).send({ message: "User not found" });
    } else if (result[0].user_id === user[0].id) {
      res.status(200).send({ message: "User Correct" });
    } else {
      res.status(200).send({ message: "User Incorrect" });
    }
  } catch (err) {
    next(err);
  }
};

const readAll = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const modeles = await tables.reservation.readAll();

    // Respond with the items in JSON format
    res.json(modeles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const add = async (req, res, next) => {
  const reservationData = req.body;
  if (reservationData.date === "" || reservationData.heure === "") {
    res.status(200).send({ message: "L'un des paramètres est manquant" });
  } else {
    try {
      // Insert the item into the database
      const insertId = await tables.reservation.create(reservationData);
      console.info(insertId);
      // Respond with HTTP 201 (Created) and the ID of the newly inserted item

      res.status(201).json({ insertId });
    } catch (err) {
      // Pass any errors to the error-handling middleware
      res.status(200).send({ message: "L'un des paramètres est manquant" });
      next(err);
    }
  }
};

const edit = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { listId, listName, listDescription } = req.body;
    const user = await tables.user.checkToken(token);
    const result = await tables.list.checkListId(listId);

    if (result.length === 0) {
      res.status(200).send({
        message: "Une erreur est survenu veuillez réessayer plus tard",
      });
    } else if (user.length === 0) {
      res.status(200).send({
        message: "Une erreur est survenu veuillez réessayer plus tard",
      });
    } else if (result[0].user_id === user[0].id) {
      await tables.list.editList(listId, listName, listDescription);
      res.status(200).send({ message: "Modification réussie" });
    } else {
      res.status(200).send({
        message: "Une erreur est survenu veuillez réessayer plus tard",
      });
    }
  } catch (err) {
    next(err);
  }
};

const destroyReservation = async (req, res, next) => {
  try {
    const { id } = req.body;
    await tables.reservation.deleteReservation(id);

    res.status(200).send({ message: "Reservation supprimé" });
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  checkListId,
  readAll,
  add,
  edit,
  destroyReservation,
};
