const AbstractManager = require("./AbstractManager");

class VehiculeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "vehicule" });
  }

  // The C of CRUD - Create operation

  async create(vehicule) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (proprietaire_id, modele_id)
             values (?, ?)`,
      [vehicule.proprietaire_id, vehicule.modele_id]
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
    const [rows] = await this.database
      .query(`select v.id, u.nom, u.prenom, m.name as modele_name, ma.name as marque_name
       from ${this.table} as v
       join user as u on u.id = v.proprietaire_id
       join modele as m on m.id = v.modele_id
       join marque as ma on ma.id = m.marque_id
       `);

    // Return the array of items
    return rows;
  }

  async checkVehicule(proprietaireId) {
    const [rows] = await this.database.query(
      `SELECT * FROM vehicule WHERE proprietaire_id = ?`,
      [proprietaireId]
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

module.exports = VehiculeManager;
