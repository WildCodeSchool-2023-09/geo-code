const AbstractManager = require("./AbstractManager");

class ReservationManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "reservation" });
  }

  // The C of CRUD - Create operation

  async create(reservationData) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (vehicule_id, borne_id, date_reservation, heure, heure_fin)
             values (?, ?, ?, ?, ?)`,
      [
        reservationData.vehicule_id,
        reservationData.borne_id,
        reservationData.date,
        reservationData.heure,
        reservationData.heure_fin,
      ]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select *
             from ${this.table}
             where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select *
                                                  from reservation`);

    // Return the array of items
    return rows;
  }

  async checkReservationForDelete(vehiculeId) {
    const [rows] = await this.database.query(
      `SELECT id, borne_id, DATE_FORMAT(date_reservation, "%Y-%m-%d") as date_reservation, heure, heure_fin FROM reservation WHERE vehicule_id = ?`,
      [vehiculeId]
    );

    return rows;
  }

  async deleteReservation(vehiculeId) {
    const [rows] = await this.database.query(
      `DELETE FROM reservation WHERE id = ?`,
      [vehiculeId]
    );

    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = ReservationManager;
