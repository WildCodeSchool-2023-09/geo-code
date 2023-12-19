const AbstractManager = require("./AbstractManager");

class BorneManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "borne" });
  }

  // The C of CRUD - Create operation

  async create(borne) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, code_postal, lng, lat, puissance, tarification_id, accessibilite_id,
                                        booked, type_prise, enseigne_id)
             values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        borne.name,
        borne.code_postal,
        borne.lng,
        borne.lat,
        borne.puissance,
        borne.tarification_id,
        borne.accessibilite_id,
        borne.booked,
        borne.type_prise,
        borne.enseigne_id,
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
                                                  from ${this.table}`);

    // Return the array of items
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

module.exports = BorneManager;
